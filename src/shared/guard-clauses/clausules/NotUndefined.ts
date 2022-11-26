import { GuardClause } from "./abstract/GuardClause";

export class NotUndefined extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be undefined.`;
  }

  wasSatisfied(): boolean {
    return this.value !== undefined;
  }
}
