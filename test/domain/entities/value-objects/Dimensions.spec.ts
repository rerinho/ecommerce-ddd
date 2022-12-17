import { VALID_CREATE_DIMENSION_ARGS } from "@test/utils/factories/value-object-factory/DimensionFactory";
import { Dimension } from "~/domain/entities/value-objects/Dimension";

describe("Dimensions", () => {
  describe.each(["lengthInMeters", "widthInMeters", "heightInMeters"])(
    "when the entered %s is non-positive",
    (key: string) => {
      test.each([0, -0.01])("%d", (value: number) => {
        expect(() =>
          Dimension.Create({
            ...VALID_CREATE_DIMENSION_ARGS,
            [key]: value,
          })
        ).toThrowError(Error(`${key} must be a positive number.`));
      });
    }
  );

  test("should create a Dimensions instance when a valid dimensions values are entered", () => {
    const dimension = Dimension.Create(VALID_CREATE_DIMENSION_ARGS);

    expect(dimension).toBeTruthy();
    expect(dimension.height).toBe(VALID_CREATE_DIMENSION_ARGS.heightInMeters);
    expect(dimension.length).toBe(VALID_CREATE_DIMENSION_ARGS.lengthInMeters);
    expect(dimension.width).toBe(VALID_CREATE_DIMENSION_ARGS.widthInMeters);
  });
});
