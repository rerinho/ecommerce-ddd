import { CouponCode } from "./value-objects/CouponCode";
import { Discount, DiscountType } from "./value-objects/Discount";

export interface CreateCouponInput {
  discountValue: number;
  discountType: DiscountType;
  code: string;
}

export class Coupon {
  private _code: CouponCode;
  private _discount: Discount;

  constructor({ code, discountValue, discountType }: CreateCouponInput) {
    this._discount = Discount.Create(discountValue, discountType);
    this._code = CouponCode.Create(code);
  }

  get code(): string {
    return this._code.value;
  }

  get discount(): Discount {
    return this._discount;
  }
}
