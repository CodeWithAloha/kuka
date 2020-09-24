import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/firestore';
import { firebaseConfig } from 'src/config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
