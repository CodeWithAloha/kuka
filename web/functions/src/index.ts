import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const createProfile = (userRecord: admin.auth.UserRecord) => {
  const { uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ zipCode: '', lobbyGroup: '' })
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
};
