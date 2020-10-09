import firebase, { firestore } from 'src/firebase';
import type { AgendaItem } from 'src/types/agendaItem';

// https://github.com/briandesousa/firebase-with-react-hooks/blob/logrocket-blog/src/services/firestore.js

export const agendaRef = firestore.collection('agendaItems');

export const createAgendaItem = (payload: AgendaItem) => agendaRef
  .add({
    ...payload,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

export const updateAgendaItem = (id: string, payload: AgendaItem) => agendaRef
  .doc(id)
  .update({
    ...payload,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
