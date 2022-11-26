import { NumberTool } from "../../tools/NumberTool";
import { GuardClause } from "./abstract/GuardClause";

export class IsInteger extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} must be an integer number.`;
  }

  wasSatisfied(): boolean {
    return NumberTool.isInteger(this.value);
  }
}
