import { NotNull } from "./NotNull";
import { NotUndefined } from "./NotUndefined";
import { CreateGuardClauseInput, GuardClause } from "./GuardClause";
import { MaxLength } from "./MaxLength";
import { MinLength } from "./MinLength";
import { IsPositive } from "./IsPositive";
import { IsValidCpf } from "./IsValidCpf";

export class Guard {
  private guardClauses: GuardClause[];

  private constructor(private value: unknown, private argumentName: string) {
    this.guardClauses = [];
  }

  static Create({
    argumentName,
    value,
  }: Pick<CreateGuardClauseInput, "value" | "argumentName">) {
    return new Guard(value, argumentName);
  }

  notNull() {
    this.addGuardClause(
      new NotNull({
        value: this.value,
        argumentName: this.argumentName,
      })
    );
    return this;
  }

  notUndefined() {
    this.addGuardClause(
      new NotUndefined({
        value: this.value,
        argumentName: this.argumentName,
      })
    );
    return this;
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

  private addGuardClause(guardClause: GuardClause) {
    this.guardClauses.push(guardClause);
  }

  validate() {
    this.guardClauses.forEach((guardClause: GuardClause) => {
      guardClause.validate();
    });
  }
}
