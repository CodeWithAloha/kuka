import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { eventItemToAgenda, getEventItems, getEvents } from "./services/legistar";

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

interface ClaimsDocumentData extends admin.firestore.DocumentData {
  _lastCommitted?: admin.firestore.Timestamp
}


const authOnCreate = functions.auth.user().onCreate((userRecord) => {
  const { uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ zipCode: '', lobbyGroup: '' })
    .catch(console.error);
});

const mirrorCustomClaims = functions.firestore.document('permissions/{uid}')
  .onWrite(async (change, context) => {
    // https://medium.com/firebase-developers/patterns-for-security-with-firebase-supercharged-custom-claims-with-firestore-and-cloud-functions-bb8f46b24e11

    const beforeData: ClaimsDocumentData = change.before.data() || {};
    const afterData: ClaimsDocumentData = change.after.data() || {};

    const skipUpdate =
      beforeData._lastCommitted &&
      afterData._lastCommitted &&
      !beforeData._lastCommitted.isEqual(afterData._lastCommitted)

    if (skipUpdate) {
      console.log("No changes")
      return
    }

    // Create a new JSON payload and check that it's under
    // the 1000 character max
    const { _lastCommitted, ...newClaims } = afterData
    const stringifiedClaims = JSON.stringify(newClaims)

    if (stringifiedClaims.length > 1000) {
      console.error("New custom claims object string > 1000 characters", stringifiedClaims)
      return
    }

    const uid = context.params.uid
    console.log(`****Setting custom claims for ${uid}`, newClaims)
    await auth.setCustomUserClaims(uid, newClaims)
    console.log('Updating document timestamp')
    await change.after.ref.update({
      _lastCommitted: admin.firestore.FieldValue.serverTimestamp(),
      ...newClaims
    })
  })

const legistar = functions.https.onRequest(async (req, res) => {
  const startDate = await db
    .collection("crawlers")
    .doc('legistar')
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.debug('Doc exists, using last date')
        // @ts-ignore
        return doc.data()._lastUpdated.toDate();
      } else {
        console.debug('doc does not exist, using 1-week as boundary.')
        return new Date(Date.now() - 7 * 24 * 3600 * 1000)  //default to last week
      }
    }
  );

  console.log(`crawler start date: ${startDate}`);
  const updatedEvents = await getEvents(startDate);

  for (const event of updatedEvents) {
    // use for-loop instead of async to limit server requests

    console.log("Crawling Event:")
    console.log(event)
    const eventItems = await getEventItems(event.EventId);
    const batch = db.batch();

    const agendaItems = await Promise.all(
      eventItems.map(async (eventItem) => {
        console.log('Event Item')
        console.log(eventItem)
        return eventItemToAgenda(event, eventItem)
      })
    )
    agendaItems.map((agendaItem) => {
      batch.set(
        db.collection('agendaItems').doc(agendaItem.id),
        {...agendaItem},
        { merge: true })
    })

    console.log('Committing batch.')
    await batch.commit()
    console.log('Batch updated.')
  }

  res.json({ ok: 'you da man' });
});

module.exports = {
  authOnCreate,
  mirrorCustomClaims,
  legistar,
};
