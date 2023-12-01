import {
  IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE,
  IsLessThanOrEqualTo,
} from "~/common/guard-clauses/clausules/IsLessThanEqualTo";

describe("IsLessThanOrEqualTo", () => {
  describe("validate", () => {
    describe("should throw when the entered value is greater than the threshold", () => {
      it.each([[3], [4]])("%d", (value: number) => {
        expect(() =>
          new IsLessThanOrEqualTo({
            value,
            argumentName: "argument",
            maxValue: 2,
          }).validate()
        ).toThrowError(
          Error(IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE("argument", 2))
        );
      });
    });

    describe("should not throw when the entered value is less than or equal to the threshold", () => {
      it.each([[2], [1]])("%d", (value: number) => {
        expect(() =>
          new IsLessThanOrEqualTo({
            value,
            argumentName: "argument",
            maxValue: 2,
          }).validate()
        ).not.toThrowError();
      });
    });
  });
});
