import _ = require("lodash");
import {
  IsValidUuid,
  INVALID_UUID_MESSAGE,
} from "~/common/guard-clauses/clausules/IsValidUuid";

describe("IsValidUuid", () => {
  describe("should throw error, when the entered value", () => {
    describe("its not a valid uuid", () => {
      test.each([
        ["random string"],
        ["00000000-0000-0000-0000-000000000000"],
        ["bf6067d8-7432-11ed-a1eb-0242ac120002"],
      ])("%s", (value: string) => {
        expect(() =>
          new IsValidUuid({ value, argumentName: "uuid" }).validate()
        ).toThrowError(Error(INVALID_UUID_MESSAGE("uuid")));
      });
    });
  });

  describe("should not throw error, when a valid uuid string is entered", () => {
    test.each([
      ["f8a8d3ad-370b-4d12-9896-035cab88ee8b"],
      ["8eb13701-7259-4b15-95ea-c6dc49ffdf7c"],
      ["c8129808-8332-4528-a1ca-99dd6bb94c57"],
      ["d3818ca3-8219-4a2b-b8df-3e2e1a990afe"],
      ["b04e3b3d-56ac-4a6d-a96b-6def6cb82b57"],
    ])("%s", (uuidString: string) => {
      expect(() =>
        new IsValidUuid({
          value: uuidString,
          argumentName: "uuid",
        }).validate()
      ).not.toThrowError();
    });
  });
});
