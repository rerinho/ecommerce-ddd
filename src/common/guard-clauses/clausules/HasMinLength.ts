import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export const HAS_MIN_LENGTH_ERORR_MESSAGE = (
  argumentName: string,
  length: number
) => `${argumentName} cannot be shorter than ${length}.`;

export class HasMinLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseOptions & { minLength: number }) {
    super(input);
    this.length = input.minLength;
  }

  getGuardExceptionMessage(): string {
    return HAS_MIN_LENGTH_ERORR_MESSAGE(this.argumentName, this.length);
  }

  wasSatisfied(): boolean {
    return typeof this.value === "string" && this.value.length >= this.length;
  }
}
