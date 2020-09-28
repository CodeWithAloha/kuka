import { parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * Parses a legistar date and time component (stored in separate fields) into
 * a single Date object with UTC timezone
 *
 * @param dateComponent a legistar date component, i.e. 2018-01-01T00:00:00
 * @param timeComponent legistar time component, i.e. '9:00 AM'
 */
const parseLegistarDateToUtc = (dateComponent: string, timeComponent: string): Date => {
  // console.log(`Parsing\n  dateComponent: ${dateComponent}\n  timeComponent: ${timeComponent}`)
  const parsedDate = parse(dateComponent.split('T')[0],'yyyy-MM-dd', new Date())
  const combined = parse(timeComponent, 'h:mm aa', parsedDate)

  return zonedTimeToUtc(combined, 'Pacific/Honolulu')
}

export default parseLegistarDateToUtc;
