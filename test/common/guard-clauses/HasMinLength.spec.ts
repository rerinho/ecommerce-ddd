import {
  HAS_MIN_LENGTH_ERORR_MESSAGE,
  HasMinLength,
} from "~/common/guard-clauses/clausules/HasMinLength";

describe("HasMinLength", () => {
  describe("validate", () => {
    describe("should throw when the entered value has length less than the max length", () => {
      test.each([["aaa"], ["aa"], ["a"], [""]])("%s", (value: string) => {
        expect(() =>
          new HasMinLength({
            value,
            argumentName: "argument",
            minLength: 4,
          }).validate()
        ).toThrowError(Error(HAS_MIN_LENGTH_ERORR_MESSAGE("argument", 4)));
      });
    });

    describe("should not throw when the entered value has length greater than the max length", () => {
      test.each([["aaaaa"], ["aaaaaa"], ["aaaaaaaaaaa"]])(
        "%s",
        (value: string) => {
          expect(() =>
            new HasMinLength({
              value,
              argumentName: "argument",
              minLength: 4,
            }).validate()
          ).not.toThrowError();
        }
      );
    });
  });
});
