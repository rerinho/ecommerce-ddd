import { HAS_MAX_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMaxLength";
import { HAS_MIN_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMinLength";
import { ProductDescription } from "~/domain/entities/value-objects/ProductDescription";

describe("ProductDescription", () => {
  describe("should throw when product description", () => {
    it("is empty", () => {
      expect(() => ProductDescription.Create("")).toThrow(
        Error(HAS_MIN_LENGTH_ERORR_MESSAGE("description", 1))
      );
    });

    it("is longer than expected", () => {
      expect(() => ProductDescription.Create("A product description longer than expected")).toThrow(
        Error(HAS_MAX_LENGTH_ERORR_MESSAGE("description", 20))
      );
    });
  });

  describe("should not throw when product description is", () => {
    it.each([
      ["equals to lower bound", "a"],
      ["greater than lower bound", "aa"],
      ["equals to upper bound", "aaaaaaaaaaaaaaaaaaaa"],
      ["less than upper bound", "aaaaaaaaaaaaaaaaaaa"],
    ])("%s: %s", (_, description: string) => {
      expect(() => ProductDescription.Create(description)).not.toThrowError();
    });
  });
});
