import type { Timestamp } from '@firebase/firestore-types';

// TODO: Rename to AgendaItem
export interface Agenda {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  billCode: string;

  heroImage?: string;

  //TODO: maybe use withConverter() so we never have to deal with Timestamps.
  hearingTime: Timestamp;
  deadlineTime: Timestamp;
  isActive: boolean;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

