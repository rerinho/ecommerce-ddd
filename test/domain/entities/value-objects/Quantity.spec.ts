import { Quantity } from "../../../../src/domain/entities/value-objects/Quantity";

describe("Quantity", () => {
  describe("should throw error, when the entered value", () => {
    test("is not an integer", () => {
      expect(() => Quantity.Create(1.5)).toThrowError(
        Error("quantity must be an integer number.")
      );
    });

    test.each([[0], [-1]])("%d", (value: number) => {
      expect(() => Quantity.Create(value)).toThrowError(
        Error("quantity must be a positive number.")
      );
    });
  });

  test("should create a Quantity instance when an positive integer value is entered", () => {
    const quantity = Quantity.Create(1);

    expect(quantity.value).toBe(1);
  });
});
