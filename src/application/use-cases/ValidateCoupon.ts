import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { CouponRepository } from "~/domain/repositories/CouponRepository";

interface ValidateCouponInput {
  couponCode: string;
}

export class ValidateCoupon {
  constructor(private couponRepository: CouponRepository) {}

  async execute({ couponCode }: ValidateCouponInput): Promise<boolean> {
    const coupon = await this.couponRepository.find(
      CouponCode.Create(couponCode)
    );
    if (!coupon) {
      return false;
    }
    return !coupon.isExpired();
  }
}
