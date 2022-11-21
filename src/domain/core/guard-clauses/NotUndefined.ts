import { isUndefined } from "./validators/Validators";
import { GuardClause } from "./GuardClause";

export class NotUndefined extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be undefined.`;
  }

  wasSatisfied(): boolean {
    return !isUndefined(this.value);
  }
}
