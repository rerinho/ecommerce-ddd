import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export const IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE = (
  argumentName: string,
  minValue: number
) => `${argumentName} must be equal or greater than ${minValue}.`;

export class IsGreaterThanOrEqualTo extends GuardClause {
  private minValue: number;

  constructor(input: CreateGuardClauseOptions & { minValue: number }) {
    super(input);
    this.minValue = input.minValue;
  }

  getGuardExceptionMessage(): string {
    return IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE(
      this.argumentName,
      this.minValue
    );
  }

  wasSatisfied(): boolean {
    return typeof this.value === "number" && this.value >= this.minValue;
  }
}
