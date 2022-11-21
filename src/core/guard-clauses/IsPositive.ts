import { isPositive } from "./validators/Validators";
import { GuardClause } from "./GuardClause";

export class IsPositive extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} must be a positive number.`;
  }

  wasSatisfied(): boolean {
    return isPositive(this.value);
  }
}
