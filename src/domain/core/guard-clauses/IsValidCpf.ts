import { GuardClause } from "./GuardClause";
import { isValidCpf } from "./validators/Validators";

export class IsValidCpf extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} its not a valid CPF..`;
  }

  wasSatisfied(): boolean {
    return isValidCpf(this.value);
  }
}
