import { GuardClause } from "./abstract/GuardClause";

export class NotNull extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be null.`;
  }

  wasSatisfied(): boolean {
    return this.value !== null;
  }
}
