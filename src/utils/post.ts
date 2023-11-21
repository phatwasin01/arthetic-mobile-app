import moment from "moment";
moment.locale("th");
export function TimestampToDate(unixTimestamp: string) {
  try {
    const timeInt = parseInt(unixTimestamp);
    const date = new Date(timeInt);
    return moment(date).format("HH:mm D/MM/YYYY");
  } catch (error) {
    return "Invalid Date";
  }
}

export function FromNow(unixTimestamp: string) {
  try {
    const timeInt = parseInt(unixTimestamp);
    const date = new Date(timeInt);
    return moment(date).fromNow();
  } catch (error) {
    return "Invalid Date";
  }
}
