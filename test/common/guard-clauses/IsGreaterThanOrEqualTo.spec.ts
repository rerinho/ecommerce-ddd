import {
  IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE,
  IsGreaterThanOrEqualTo,
} from "~/common/guard-clauses/clausules/IsGreaterThanOrEqualTo";

describe("IsGreaterThanOrEqualTo", () => {
  describe("validate", () => {
    describe("should throw when the entered value is less than the threshold", () => {
      it.each([[1], [0]])("%d", (value: number) => {
        expect(() =>
          new IsGreaterThanOrEqualTo({
            value,
            argumentName: "argument",
            minValue: 2,
          }).validate()
        ).toThrowError(
          Error(IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE("argument", 2))
        );
      });
    });

    describe("should not throw when the entered value is greater than or equal to the threshold", () => {
      it.each([[2], [3]])("%d", (value: number) => {
        expect(() =>
          new IsGreaterThanOrEqualTo({
            value,
            argumentName: "argument",
            minValue: 2,
          }).validate()
        ).not.toThrowError();
      });
    });
  });
});
