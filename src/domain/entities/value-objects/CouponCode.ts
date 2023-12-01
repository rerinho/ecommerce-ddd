import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

interface CouponCodeProps {
  value: string;
}

export class CouponCode extends ValueObject<CouponCodeProps> {
  private static COUPON_MAX_LENGTH = 12;
  private static COUPON_MIN_LENGTH = 6;
  static Create(code: string) {
    Guard.Argument(code, "code")
      .hasMinLength(CouponCode.COUPON_MIN_LENGTH)
      .hasMaxLength(CouponCode.COUPON_MAX_LENGTH);

    return new CouponCode({ value: code.toUpperCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
