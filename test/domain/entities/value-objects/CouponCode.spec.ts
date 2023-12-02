import { HAS_MAX_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMaxLength";
import { HAS_MIN_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMinLength";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";

describe("CouponCode", () => {
  describe("should throw when", () => {
    it("coupon code is smaller than expected", () => {
      expect(() => CouponCode.Create("COUP")).toThrow(
        Error(HAS_MIN_LENGTH_ERORR_MESSAGE("code", 6))
      );
    });

    it("coupon code is longer than expected", () => {
      expect(() => CouponCode.Create("LONGERCOUPONCODE")).toThrow(
        Error(HAS_MAX_LENGTH_ERORR_MESSAGE("code", 12))
      );
    });
  });

  describe("should not throw when coupon code is", () => {
    it.each([
      ["equals to lower bound", "aaaaaa"],
      ["greater than lower bound", "aaaaaaa"],
      ["equals to upper bound", "aaaaaaaaaaaa"],
      ["less than upper bound", "aaaaaaaaaaa"],
    ])("%s: %s", (_,code: string) => {
      expect(() => CouponCode.Create(code)).not.toThrowError();
    });
  });
});
