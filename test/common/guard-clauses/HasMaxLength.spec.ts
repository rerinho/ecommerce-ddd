import {
  HAS_MAX_LENGTH_ERORR_MESSAGE,
  HasMaxLength,
} from "~/common/guard-clauses/clausules/HasMaxLength";

describe("HasMaxLength", () => {
  describe("validate", () => {
    describe("should throw when the entered value has length greater than the max length", () => {
      test.each([["aaaaa"], ["aaaaaa"], ["aaaaaaaaaaa"]])(
        "%s",
        (value: string) => {
          expect(() =>
            new HasMaxLength({
              value,
              argumentName: "argument",
              maxLength: 4,
            }).validate()
          ).toThrowError(Error(HAS_MAX_LENGTH_ERORR_MESSAGE("argument", 4)));
        }
      );
    });

    describe("should not throw when the entered value has length less than the max length", () => {
      test.each([["aaa"], ["aa"], ["a"], [""]])("%s", (value: string) => {
        expect(() =>
          new HasMaxLength({
            value,
            argumentName: "argument",
            maxLength: 4,
          }).validate()
        ).not.toThrowError();
      });
    });
  });
});
