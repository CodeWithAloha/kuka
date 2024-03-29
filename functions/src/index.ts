/* eslint no-await-in-loop: 0 no-console: 0 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { eventItemToAgenda, getEventItems, getEvents } from './services/legistar';

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

interface ClaimsDocumentData extends admin.firestore.DocumentData {
  _lastCommitted?: admin.firestore.Timestamp
}

/**
 * Sets some basic user profile data when a user is created
 */
const authOnCreate = functions.auth.user().onCreate((userRecord) => {
  const { uid } = userRecord;

  return db
    .collection('users')
    .doc(uid)
    .set({ zipCode: '', lobbyGroup: '' })
    .catch(console.error);
});

const mirrorCustomClaims = functions.firestore.document('permissions/{uid}')
  .onWrite(async (change, context) => {
    // eslint-disable-next-line max-len
    // https://medium.com/firebase-developers/patterns-for-security-with-firebase-supercharged-custom-claims-with-firestore-and-cloud-functions-bb8f46b24e11

    const beforeData: ClaimsDocumentData = change.before.data() || {};
    const afterData: ClaimsDocumentData = change.after.data() || {};

    const skipUpdate = beforeData._lastCommitted
      && afterData._lastCommitted
      && !beforeData._lastCommitted.isEqual(afterData._lastCommitted);

    if (skipUpdate) {
      console.log('No changes');
      return;
    }

    // Create a new JSON payload and check that it's under
    // the 1000 character max
    const { _lastCommitted, ...newClaims } = afterData;
    const stringifiedClaims = JSON.stringify(newClaims);

    if (stringifiedClaims.length > 1000) {
      console.error('New custom claims object string > 1000 characters', stringifiedClaims);
      return;
    }

    const { uid } = context.params;
    console.log(`****Setting custom claims for ${uid}`, newClaims);
    await auth.setCustomUserClaims(uid, newClaims);
    console.log('Updating document timestamp');
    await change.after.ref.update({
      _lastCommitted: admin.firestore.FieldValue.serverTimestamp(),
      ...newClaims,
    });
  });

const legistarUpdate = functions.https.onRequest(async (req, res) => {
  // TODO: Unsure how event timestamps are updated, if an incremental update is done
  // we could miss data. Use a rolling 7-day window to hopefully capture a more
  // complete dataset.
  const startDate = new Date(Date.now() - 7 * 24 * 3600 * 1000); // default to last week

  console.log(`crawler start date: ${startDate}`);
  const updatedEvents = await getEvents(startDate);

  // eslint-disable-next-line no-restricted-syntax
  for (const event of updatedEvents) {
    // console.log("Crawling Event:")
    // console.log(event)
    const eventItems = await getEventItems(event.EventId);
    const batch = db.batch();

    const agendaItems = await Promise.all(
      eventItems.map(async (eventItem) => {
        console.log('Event Item');
        console.log(eventItem);
        return eventItemToAgenda(event, eventItem);
      }),
    );
    agendaItems.forEach((agendaItem) => {
      if (agendaItem) {
        batch.set(
          db
            .collection('agendaItems')
            .doc(agendaItem.id),
          { ...agendaItem },
          { merge: true },
        );
      }
    });

    console.log('Committing batch.');
    await batch.commit();
    console.log('Batch updated.');
  }

  res.json({ ok: 'done' });
});

module.exports = {
  authOnCreate,
  mirrorCustomClaims,
  legistarUpdate,
};
