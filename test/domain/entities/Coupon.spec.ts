import { Coupon } from "../../../src/domain/entities/Coupon";
import { DiscountType } from "../../../src/domain/entities/value-objects/Discount";

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
          })
      ).toThrow(Error(expectedMessage));
    });
  });

  test("should create a coupon when a valid code is entered", () => {
    const validCode = "VALIDCODE123";
    const coupon = new Coupon({
      code: validCode,
      discountType: DiscountType.Nominal,
      discountValue: 10,
    });

    expect(coupon.code).toBe(validCode);
  });
});
