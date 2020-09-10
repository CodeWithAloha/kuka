import moment from 'moment'

const daysRemaining = (date: Date) => {
  const now = moment();
  return moment(date).diff(now, 'days');
}

export default daysRemaining;
