import { hasLengthBigOrEqualTo } from "./validators/Validators";
import { CreateGuardClauseInput, GuardClause } from "./GuardClause";

export class MinLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseInput & { minLength: number }) {
    super(input);
    this.length = input.minLength;
  }

  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be shorter than  ${this.length}.`;
  }

  wasSatisfied(): boolean {
    return hasLengthBigOrEqualTo(this.value, this.length);
  }
}
