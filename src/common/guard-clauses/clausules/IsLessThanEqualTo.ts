import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export const IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE = (
  argumentName: string,
  maxValue: number
) => `${argumentName} must be equal or less than ${maxValue}.`;

export class IsLessThanOrEqualTo extends GuardClause {
  private maxValue: number;

  constructor(input: CreateGuardClauseOptions & { maxValue: number }) {
    super(input);
    this.maxValue = input.maxValue;
  }

  getGuardExceptionMessage(): string {
    return IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE(
      this.argumentName,
      this.maxValue
    );
  }

  wasSatisfied(): boolean {
    return typeof this.value === "number" && this.value <= this.maxValue;
  }
}
