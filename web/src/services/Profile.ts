import { firestore } from 'src/firebase';
import { Profile } from '../types/profile';

// todo: rename "users" to userProfile or something similar
export const profileRef = firestore.collection('users');

export const updateProfile = (userId: string, values: Profile) => profileRef.doc(userId).set({
  ...values,
});
