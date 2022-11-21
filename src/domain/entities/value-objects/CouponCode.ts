import { Guard } from "../../../core/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../core/ValueObject";

interface CouponCodeProps {
  value: string;
}

const COUPON_LENGTH = 12;

export class CouponCode extends ValueObject<CouponCodeProps> {
  static Create(code: string) {
    Guard.Create({ value: code, argumentName: "code" })
      .minLength(COUPON_LENGTH)
      .maxLength(COUPON_LENGTH)
      .validate();

    return new CouponCode({ value: code });
  }

  get value(): string {
    return this.props.value;
  }
}
