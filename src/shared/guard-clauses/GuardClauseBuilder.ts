import {
  MaxLength,
  IsInteger,
  IsPositive,
  IsValidCpf,
  MinLength,
} from "./clausules";
import {
  CreateGuardClauseOptions,
  GuardClause,
} from "./clausules/abstract/GuardClause";

export class Guard {
  private guardClauses: GuardClause[];

  private constructor(private value: unknown, private argumentName: string) {
    this.guardClauses = [];
  }

  static Create({
    argumentName,
    value,
  }: Pick<CreateGuardClauseOptions, "value" | "argumentName">) {
    return new Guard(value, argumentName);
  }


  maxLength(length: number) {
    this.addGuardClause(
      new MaxLength({
        value: this.value,
        argumentName: this.argumentName,
        maxLength: length,
      })
    );
    return this;
  }

  minLength(length: number) {
    this.addGuardClause(
      new MinLength({
        value: this.value,
        argumentName: this.argumentName,
        minLength: length,
      })
    );
    return this;
  }

  isPositive() {
    this.addGuardClause(
      new IsPositive({
        value: this.value,
        argumentName: this.argumentName,
      })
    );
    return this;
  }

  isValidCpf() {
    this.addGuardClause(
      new IsValidCpf({
        value: this.value,
        argumentName: this.argumentName,
      })
    );
    return this;
  }

  isInteger() {
    this.addGuardClause(
      new IsInteger({
        value: this.value,
        argumentName: this.argumentName,
      })
    );
    return this;
  }

  private addGuardClause(guardClause: GuardClause) {
    this.guardClauses.push(guardClause);
  }

  validate() {
    this.guardClauses.forEach((guardClause: GuardClause) => {
      guardClause.validate();
    });
  }
}
