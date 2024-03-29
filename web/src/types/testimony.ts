import type { Timestamp } from '@firebase/firestore-types';

export interface Testimony {
  id?: string;
  userId: string;
  email: string;
  lobbyGroup: string | null;
  name: string;
  fullPath: string;
  position: 'Approve' | 'Disapprove' | 'Comment';

  // takes a snapshot of the data at the time of submission
  zipCode: string;

  createdAt?: Timestamp;
}
