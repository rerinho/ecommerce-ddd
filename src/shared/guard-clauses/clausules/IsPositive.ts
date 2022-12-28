import { NumberTool } from "../../tools/NumberTool";
import { GuardClause } from "./abstract/GuardClause";

export const IS_POSITIVE_ERROR_MESSAGE = (argumentName: string) =>
  `${argumentName} must be a positive number.`;

export class IsPositive extends GuardClause {
  getGuardExceptionMessage(): string {
    return IS_POSITIVE_ERROR_MESSAGE(this.argumentName);
  }

  wasSatisfied(): boolean {
    return typeof this.value === "number" && NumberTool.isPositive(this.value);
  }
}
