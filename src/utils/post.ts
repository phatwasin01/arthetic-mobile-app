import moment from "moment";
moment.locale("th");
export function TimestampToDate(unixTimestamp: string) {
  const timeInt = parseInt(unixTimestamp);
  const date = new Date(timeInt);
  return moment(date).format("HH:mm D/MM/YYYY");
}

export function FromNow(unixTimestamp: string) {
  const timeInt = parseInt(unixTimestamp);
  const date = new Date(timeInt);
  return moment(date).fromNow();
}
