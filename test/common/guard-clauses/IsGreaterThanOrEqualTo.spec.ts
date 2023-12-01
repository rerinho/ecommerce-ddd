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
