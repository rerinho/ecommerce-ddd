import { isNull } from "./validators/Validators";
import { GuardClause } from "./GuardClause";

export class NotNull extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be null.`;
  }

  wasSatisfied(): boolean {
    return !isNull(this.value);
  }
}
