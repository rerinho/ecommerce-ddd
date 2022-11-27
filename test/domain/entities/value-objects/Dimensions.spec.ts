import { Dimensions } from "~/domain/entities/value-objects/Dimensions";

const VALID_CREATE_DIMENSIONS_OPTIONS = {
  height: 1,
  width: 1,
  length: 1,
};

describe("Dimensions", () => {
  describe.each(["length", "width", "height"])(
    "when the entered %s is non-positive",
    (key: string) => {
      test.each([0, -0.01])("%d", (value: number) => {
        expect(() =>
          Dimensions.Create({
            ...VALID_CREATE_DIMENSIONS_OPTIONS,
            [key]: value,
          })
        ).toThrowError(Error(`${key} must be a positive number.`));
      });
    }
  );

  test("should create a Dimensions instance when a valid dimensions values are entered", () => {
    const dimension = Dimensions.Create(VALID_CREATE_DIMENSIONS_OPTIONS);

    expect(dimension).toBeTruthy();
    expect(dimension.height).toBe(VALID_CREATE_DIMENSIONS_OPTIONS.height);
    expect(dimension.length).toBe(VALID_CREATE_DIMENSIONS_OPTIONS.length);
    expect(dimension.width).toBe(VALID_CREATE_DIMENSIONS_OPTIONS.width);
  });
});
