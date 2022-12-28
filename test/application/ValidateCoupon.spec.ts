import { makeCoupon } from "@test/utils/factories/entity-factory/CouponFactory";
import { ValidateCoupon } from "~/application/use-cases/ValidateCoupon";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { CouponRepository } from "~/domain/repositories/CouponRepository";
import { CouponInMemoryRepository } from "~/infra/repositories/in-memory/CouponInMemoryRepository";
import { DateTool } from "~/shared/tools/DateTool";

// Constants
const validCoupon = makeCoupon({
  code: CouponCode.Create("VALIDCOUPON"),
});
const expiredCoupon = makeCoupon({
  code: CouponCode.Create("EXPIRED"),
  expirationDate: DateTool.addDaysTo(new Date(), -10),
});

describe("ValidateCoupon", () => {
  let validateCoupon: ValidateCoupon;
  const couponRepository = new CouponInMemoryRepository();

  beforeAll(async () => {
    validateCoupon = new ValidateCoupon(couponRepository);
    await setupCoupons(couponRepository);
  });

  describe("should return false", () => {
    test("when the coupon is expired", async () => {
      const output = await validateCoupon.execute({
        couponCode: expiredCoupon.code.value,
      });

      expect(output).toBe(false);
    });

    test("when the coupon does not exists", async () => {
      const output = await validateCoupon.execute({
        couponCode: "RANDOMCODE31",
      });

      expect(output).toBe(false);
    });
  });

  test("should return true when the coupon is not expired", async () => {
    const output = await validateCoupon.execute({
      couponCode: validCoupon.code.value,
    });

    expect(output).toBe(true);
  });
});

// Setups
async function setupCoupons(couponRepository: CouponRepository) {
  await Promise.all([
    couponRepository.save(validCoupon),
    couponRepository.save(expiredCoupon),
  ]);
}
