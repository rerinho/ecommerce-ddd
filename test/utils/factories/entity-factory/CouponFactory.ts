import { Coupon, CreateCouponArgs } from "~/domain/entities/Coupon";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { Discount } from "~/domain/entities/value-objects/Discount";
import { DateTool } from "~/common/tools/DateTool";

export const VALID_CREATE_COUPON_ARGS: CreateCouponArgs = {
  code: CouponCode.Create("VALIDCODE123"),
  discount: Discount.Create(0.1),
  expirationDate: DateTool.addDaysTo(new Date(), 10),
};

export function makeCoupon(options?: Partial<CreateCouponArgs>) {
  return new Coupon({
    ...VALID_CREATE_COUPON_ARGS,
    ...options,
  });
}
