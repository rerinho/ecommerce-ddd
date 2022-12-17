import { Coupon } from "~/domain/entities/Coupon";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import {
  Discount,
  DiscountType,
} from "~/domain/entities/value-objects/Discount";
import { CouponRepository } from "~/domain/repositories/CouponRepository";
import { coupons as persistedCoupons } from "~/infra/database/database.json";

interface DatabaseCoupon {
  code: string;
  discount_type: string;
  discount_value: number;
  expires_at: string;
}

export class CouponInMemoryRepository implements CouponRepository {
  coupons: Coupon[] = [];

  constructor() {
    this.loadPersistedCoupons();
  }

  save(coupon: Coupon): Promise<void> {
    return new Promise((resolve) => {
      this.coupons.push(coupon);
      resolve();
    });
  }

  find(couponCode: CouponCode): Promise<Coupon | undefined> {
    return Promise.resolve(
      this.coupons.find((coupon: Coupon) => coupon.code.equals(couponCode))
    );
  }

  private loadPersistedCoupons() {
    persistedCoupons.forEach((databaseCoupon: DatabaseCoupon) => {
      const coupon = this.toDomain(databaseCoupon);
      this.coupons.push(coupon);
    });
  }

  private toDomain(databaseCoupon: DatabaseCoupon) {
    return new Coupon({
      code: CouponCode.Create(databaseCoupon.code),
      discount: Discount.Create({
        type: databaseCoupon.discount_type as DiscountType,
        value: databaseCoupon.discount_value,
      }),
      expirationDate: new Date(databaseCoupon.expires_at),
    });
  }
}
