import { VALID_CREATE_COUPON_ARGS } from "@test/utils/factories/entity-factory/CouponFactory";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { DateTool } from "~/common/tools/DateTool";
import { Coupon } from "../../../src/domain/entities/Coupon";
import { HAS_MAX_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMaxLength";
import { HAS_MIN_LENGTH_ERORR_MESSAGE } from "~/common/guard-clauses/clausules/HasMinLength";

describe("Coupon", () => {
  describe("should not allow creating coupon when", () => {
    test.each([
      [
        "smaller than expected",
        "COUP",
        HAS_MIN_LENGTH_ERORR_MESSAGE("code", 6),
      ],
      [
        "longer than expected",
        "LONGERCOUPONCODE",
        HAS_MAX_LENGTH_ERORR_MESSAGE("code", 12),
      ],
    ])("the code is %s", (_: string, code: string, expectedMessage: string) => {
      expect(
        () =>
          new Coupon({
            ...VALID_CREATE_COUPON_ARGS,
            code: CouponCode.Create(code),
          })
      ).toThrow(Error(expectedMessage));
    });
  });

  test("should create a coupon when a valid code is entered", () => {
    const coupon = new Coupon(VALID_CREATE_COUPON_ARGS);

    expect(coupon.code).toBe(VALID_CREATE_COUPON_ARGS.code);
  });

  describe("isExpired", () => {
    test("should return FALSE when the coupon expirationDate is after the current date", () => {
      const coupon = new Coupon({
        ...VALID_CREATE_COUPON_ARGS,
        expirationDate: DateTool.addDaysTo(new Date(), 1),
      });

      expect(coupon.isExpired()).toBe(false);
    });

    test("should return TRUE when the coupon expirationDate is before the current date", () => {
      const coupon = new Coupon({
        ...VALID_CREATE_COUPON_ARGS,
        expirationDate: DateTool.addDaysTo(new Date(), -1),
      });

      expect(coupon.isExpired()).toBe(true);
    });
  });
});
