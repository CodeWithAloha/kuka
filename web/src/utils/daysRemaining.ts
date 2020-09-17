import type { Timestamp } from '@firebase/firestore-types';

import { differenceInDays as differenceInDaysFns} from "date-fns";


const daysRemaining = (date: Timestamp) => {
  return differenceInDaysFns(date.toDate(), new Date())
}

export default daysRemaining;
