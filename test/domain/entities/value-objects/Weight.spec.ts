import { Weight, WeightMeasures } from "~/domain/entities/value-objects/Weight";

describe("Weight", () => {
  describe("should throw error, when the entered value", () => {
    describe("is non-positive", () => {
      test.each([[0], [-1]])("%d", (value: number) => {
        expect(() => Weight.Create(value)).toThrowError(
          Error("weight must be a positive number.")
        );
      });
    });
  });

  test("should create a Weight instance when an positive value is entered", () => {
    const weight = Weight.Create(0.5);

    expect(weight.value).toBe(0.5);
  });

  test("the measurement type should be Kilogram by default", () => {
    const weight = Weight.Create(10);

    expect(weight.measurementType).toBe(WeightMeasures.Kilogram);
  });
});
