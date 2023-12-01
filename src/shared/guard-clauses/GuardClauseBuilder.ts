import {
  MaxLength,
  IsInteger,
  IsPositive,
  IsValidCpf,
  MinLength,
  IsGreaterOrEqualThan,
  IsLessOrEqualThan,
  IsValidUuid,
} from "./clausules";

export class Guard {
  private constructor(private value: unknown, private argumentName: string) {}

  static Argument(value: unknown, argumentName: string) {
    return new Guard(value, argumentName);
  }

  hasMaxLength(length: number) {
    new MaxLength({
      value: this.value,
      argumentName: this.argumentName,
      maxLength: length,
    }).validate();
    return this;
  }

  hasMinLength(length: number) {
    new MinLength({
      value: this.value,
      argumentName: this.argumentName,
      minLength: length,
    }).validate();
    return this;
  }

  isPositive() {
    new IsPositive({
      value: this.value,
      argumentName: this.argumentName,
    }).validate();
    return this;
  }

  isValidCpf() {
    new IsValidCpf({
      value: this.value,
      argumentName: this.argumentName,
    }).validate();
    return this;
  }

  isInteger() {
    new IsInteger({
      value: this.value,
      argumentName: this.argumentName,
    }).validate();
    return this;
  }

  isValidUuid() {
    new IsValidUuid({
      value: this.value,
      argumentName: this.argumentName,
    }).validate();
    return this;
  }

  isGreaterThanOrEqualTo(value: number) {
    new IsGreaterOrEqualThan({
      value: this.value,
      argumentName: this.argumentName,
      minValue: value,
    }).validate();
    return this;
  }

  isLessThanOrEqualTo(value: number) {
    new IsLessOrEqualThan({
      value: this.value,
      argumentName: this.argumentName,
      maxValue: value,
    }).validate();
    return this;
  }
}
