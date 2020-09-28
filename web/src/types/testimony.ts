import type { Timestamp } from "@firebase/firestore-types";

export interface Testimony {
  id?: string;
  agendaId: string;

  embedUrl?: string;
  thumbUrl?: string;
  position: "APPROVE" | "DISAPPROVE" | "COMMENT";
  // storagePath?: string;

  // takes a snapshot of the data at the time of submission
  zipCode: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
