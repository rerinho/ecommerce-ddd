import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface CouponCodeProps {
  value: string;
}

export class CouponCode extends ValueObject<CouponCodeProps> {
  private static COUPON_MAX_LENGTH = 12;
  private static COUPON_MIN_LENGTH = 6;
  static Create(code: string) {
    Guard.Create({ value: code, argumentName: "code" })
      .minLength(CouponCode.COUPON_MIN_LENGTH)
      .maxLength(CouponCode.COUPON_MAX_LENGTH)
      .validate();

    return new CouponCode({ value: code });
  }

  get value(): string {
    return this.props.value;
  }
}
