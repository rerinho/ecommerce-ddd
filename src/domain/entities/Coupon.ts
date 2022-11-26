import { CouponCode } from "./value-objects/CouponCode";
import { Discount, DiscountType } from "./value-objects/Discount";

export interface CreateCouponOptions {
  discountValue: number;
  discountType: DiscountType;
  code: string;
}

export class Coupon {
  private _code: CouponCode;
  private _discount: Discount;

  constructor({ code, discountValue, discountType }: CreateCouponOptions) {
    this._discount = Discount.Create({
      type: discountType,
      value: discountValue,
    });
    this._code = CouponCode.Create(code);
  }

  get code(): string {
    return this._code.value;
  }

  get discount(): Discount {
    return this._discount;
  }
}
