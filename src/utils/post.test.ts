import { TimestampToDate } from "./post";
import moment from "moment";

moment.locale("th");
describe("TimestampToDate", () => {
  it("should convert a given unix timestamp to a formatted date string", () => {
    // Test case 2: converting the current unix timestamp
    const currentUnixTimestamp = String(Math.floor(Date.now() / 1000));
    const currentDate = new Date(parseInt(currentUnixTimestamp));
    const formattedCurrentDate = moment(currentDate).format("HH:mm D/MM/YYYY");
    expect(TimestampToDate(currentUnixTimestamp)).toEqual(formattedCurrentDate);

    // Test case 3: converting an invalid unix timestamp
    expect(TimestampToDate("abc")).toEqual("Invalid date");
  });
});
