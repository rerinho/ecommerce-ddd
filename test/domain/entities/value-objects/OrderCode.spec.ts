import { OrderCode } from "~/domain/entities/value-objects/OrderCode";
import { Sequence } from "~/domain/entities/value-objects/Sequence";

describe("OrderCode", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2021-01-01T03:00:00"));
  });

  afterAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  describe("should create a OrderCode instance when a valid Sequence is entered", () => {
    test.each([
      [1, "202100000001"],
      [34, "202100000034"],
      [99999999, "202199999999"],
    ])("%s", (sequence: number, expectedOrderCode: string) => {
      const orderCode = OrderCode.Create(Sequence.Create(sequence));

      expect(orderCode.value).toBe(expectedOrderCode);
    });
  });

  describe("The first 4 characters should be the current year", () => {
    test.each([
      [2022, "202200000001"],
      [2021, "202100000001"],
      [2000, "200000000001"],
      [1999, "199900000001"],
    ])("%d => %s", (year: number, expectedCode: string) => {
      jest.useFakeTimers().setSystemTime(new Date(`${year}-01-01T03:00:00`));

      const orderCode = OrderCode.Create(Sequence.Create(1));

      expect(orderCode.value).toBe(expectedCode);
    });
  });
});
