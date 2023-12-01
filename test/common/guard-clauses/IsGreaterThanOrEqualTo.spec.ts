import { IsGreaterThanOrEqualTo } from "~/common/guard-clauses/clausules";

describe("IsGreaterThanOrEqualTo", () => {
  describe("should throw when the entered value is lesser than the threshold", () => {
    it.each([[1], [0]])("%d", (value: number) => {
      expect(() =>
        new IsGreaterThanOrEqualTo({
          value,
          argumentName: "argument",
          minValue: 2,
        }).validate()
      ).toThrowError(Error);
    });
  });
});
