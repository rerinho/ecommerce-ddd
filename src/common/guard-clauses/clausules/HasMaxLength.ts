import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export class HasMaxLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseOptions & { maxLength: number }) {
    super(input);
    this.length = input.maxLength;
  }

  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be longer than  ${this.length}.`;
  }

  wasSatisfied(): boolean {
    return typeof this.value === "string" && this.value.length <= this.length;
  }
}
