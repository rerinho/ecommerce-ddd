import { NumberTool } from "../../tools/NumberTool";
import { GuardClause } from "./abstract/GuardClause";

export const IS_INTEGER_ERROR_MESSAGE = (argumentName: string) =>
  `${argumentName} must be an integer number.`;
  
export class IsInteger extends GuardClause {
  getGuardExceptionMessage(): string {
    return IS_INTEGER_ERROR_MESSAGE(this.argumentName);
  }

  wasSatisfied(): boolean {
    return typeof this.value === "number" && NumberTool.isInteger(this.value);
  }
}
