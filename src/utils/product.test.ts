import { priceToString } from "./product";

describe("priceToString", () => {
  it('should return "0" when price is undefined', () => {
    const price = undefined;
    const result = priceToString(price);
    expect(result).toEqual("0");
  });

  it('should return "0" when price is null', () => {
    const price = null;
    const result = priceToString(price);
    expect(result).toEqual("0");
  });

  it("should return the price formatted with commas", () => {
    const price = 1000000;
    const result = priceToString(price);
    expect(result).toEqual("1,000,000");
  });
});
