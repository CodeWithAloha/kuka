
import firebase, { firestore } from 'src/firebase';
import type { Agenda } from 'src/types/agenda';

// https://github.com/briandesousa/firebase-with-react-hooks/blob/logrocket-blog/src/services/firestore.js

export const agendaRef = firestore.collection('agendaItems')

export const createAgendaItem = (payload: Agenda) => {
  return agendaRef
    .add({
      ...payload,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const updateAgendaItem = (id: string, payload: Agenda) => {
  return agendaRef
    .doc(id)
    .update({
      ...payload,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
