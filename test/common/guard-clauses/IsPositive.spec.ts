import {
  IS_POSITIVE_ERROR_MESSAGE,
  IsPositive,
} from "~/common/guard-clauses/clausules/IsPositive";

describe("IsPositive", () => {
  describe("validate", () => {
    describe("should throw if the entered value is a non positive number", () => {
      it.each([[0], [-1], [-10]])("%f", (input: number) => {
        expect(() =>
          new IsPositive({ value: input, argumentName: "argument" }).validate()
        ).toThrowError(Error(IS_POSITIVE_ERROR_MESSAGE("argument")));
      });
    });

    describe("should not throw if the entered value is a positive number", () => {
      it.each([[0.1], [1], [10]])("%f", (input: number) => {
        expect(() =>
          new IsPositive({ value: input, argumentName: "argument" }).validate()
        ).not.toThrowError();
      });
    });
  });
});
