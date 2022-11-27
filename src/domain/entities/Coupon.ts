import { CouponCode } from "./value-objects/CouponCode";
import { Discount, DiscountType } from "./value-objects/Discount";

export interface CreateCouponOptions {
  discountValue: number;
  discountType: DiscountType;
  code: string;
  expirationDate: Date;
}

export class Coupon {
  private _code: CouponCode;
  private _discount: Discount;
  private _expirationDate: Date;

  constructor({
    code,
    discountValue,
    discountType,
    expirationDate,
  }: CreateCouponOptions) {
    this._discount = Discount.Create({
      type: discountType,
      value: discountValue,
    });
    this._code = CouponCode.Create(code);
    this._expirationDate = expirationDate;
  }

  get code(): string {
    return this._code.value;
  }

  get discount(): Discount {
    return this._discount;
  }

  isExpired() {
    return new Date() > this._expirationDate;
  }
}
