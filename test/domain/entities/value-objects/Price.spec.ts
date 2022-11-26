import { Price } from "../../../../src/domain/entities/value-objects/Price";

describe("Price", () => {
  describe("should throw error when the entered value is not positive", () => {
    test.each([[0], [-0.01]])("%d", (value: number) => {
      expect(() => Price.Create(value)).toThrowError(
        Error("price must be a positive number.")
      );
    });
  });

  test("should create a Price instance when a positive value is entered", () => {
    const price = Price.Create(0.01);

    expect(price.value).toBe(0.01);
  });
});
