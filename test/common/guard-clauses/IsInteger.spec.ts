import { IsInteger } from "~/common/guard-clauses/clausules";
import { IS_INTEGER_ERROR_MESSAGE } from "~/common/guard-clauses/clausules/IsInteger";

describe("IsInteger", () => {
  describe("validate", () => {
    describe("should throw if the entered value is a non integer number", () => {
      it.each([[0.1], [-1.1], [10.999]])("%f", (input: number) => {
        expect(() =>
          new IsInteger({ value: input, argumentName: "argument" }).validate()
        ).toThrowError(Error(IS_INTEGER_ERROR_MESSAGE("argument")));
      });
    });
  });
});
