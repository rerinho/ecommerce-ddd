import { DateTool } from "~/shared/tools/DateTool";
import { Coupon } from "../../../src/domain/entities/Coupon";
import { DiscountType } from "../../../src/domain/entities/value-objects/Discount";

const VALID_COUPON_CODE = "VALIDCODE123";

describe("Coupon", () => {
  describe("should not allow creating coupon when", () => {
    test.each([
      [
        "smaller than expected",
        "COUPONCODE",
        "code cannot be shorter than  12.",
      ],
      [
        "longer than expected",
        "LONGERCOUPONCODE",
        "code cannot be longer than  12.",
      ],
    ])("the code is %s", (_: string, code: string, expectedMessage: string) => {
      expect(
        () =>
          new Coupon({
            code,
            discountType: DiscountType.Nominal,
            discountValue: 10,
            expirationDate: new Date(),
          })
      ).toThrow(Error(expectedMessage));
    });
  });

  test("should create a coupon when a valid code is entered", () => {
    const coupon = new Coupon({
      code: VALID_COUPON_CODE,
      discountType: DiscountType.Nominal,
      discountValue: 10,
      expirationDate: new Date(),
    });

    expect(coupon.code).toBe(VALID_COUPON_CODE);
  });

  describe("isExpired", () => {
    test("should return FALSE when the coupon expirationDate is after the current date", () => {
      const coupon = new Coupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Nominal,
        discountValue: 10,
        expirationDate: DateTool.addDaysTo(new Date(), 1),
      });

      expect(coupon.isExpired()).toBe(false);
    });

    test("should return TRUE when the coupon expirationDate is before the current date", () => {
      const coupon = new Coupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Nominal,
        discountValue: 10,
        expirationDate: DateTool.addDaysTo(new Date(), -1),
      });

      expect(coupon.isExpired()).toBe(true);
    });
  });
});
