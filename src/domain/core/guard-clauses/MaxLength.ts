import { hasLengthSmallOrEqualTo } from "./validators/Validators";
import { CreateGuardClauseInput, GuardClause } from "./GuardClause";

export class MaxLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseInput & { maxLength: number }) {
    super(input);
    this.length = input.maxLength;
  }

  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be longer than  ${this.length}.`;
  }

  wasSatisfied(): boolean {
    return hasLengthSmallOrEqualTo(this.value, this.length);
  }
}
