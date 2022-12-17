import { Coupon } from "../entities/Coupon";
import { CouponCode } from "../entities/value-objects/CouponCode";

export interface CouponRepository {
  find(couponCode: CouponCode): Promise<Coupon | undefined>;
  save(coupon: Coupon): Promise<void>;
}
