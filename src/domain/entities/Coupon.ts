import { CouponCode } from "./value-objects/CouponCode";
import { Discount } from "./value-objects/Discount";

export interface CreateCouponArgs {
  discount: Discount;
  code: CouponCode;
  expirationDate: Date;
}

export class Coupon {
  private _code: CouponCode;
  private _discount: Discount;
  private _expirationDate: Date;

  constructor({ code, discount, expirationDate }: CreateCouponArgs) {
    this._discount = discount;
    this._code = code;
    this._expirationDate = expirationDate;
  }

  get code(): CouponCode {
    return this._code;
  }

  get discount(): Discount {
    return this._discount;
  }

  isExpired() {
    return new Date() > this._expirationDate;
  }
}
