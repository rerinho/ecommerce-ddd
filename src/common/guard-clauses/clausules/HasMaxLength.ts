import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export const HAS_MAX_LENGTH_ERORR_MESSAGE = (
  argumentName: string,
  length: number
) => `${argumentName} cannot be longer than ${length}.`;

export class HasMaxLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseOptions & { maxLength: number }) {
    super(input);
    this.length = input.maxLength;
  }

  getGuardExceptionMessage(): string {
    return HAS_MAX_LENGTH_ERORR_MESSAGE(this.argumentName, this.length);
  }

  wasSatisfied(): boolean {
    return typeof this.value === "string" && this.value.length <= this.length;
  }
}
