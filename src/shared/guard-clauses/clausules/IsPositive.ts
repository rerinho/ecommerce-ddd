import { NumberTool } from "../../tools/NumberTool";
import { GuardClause } from "./abstract/GuardClause";

export class IsPositive extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} must be a positive number.`;
  }

  wasSatisfied(): boolean {
    return NumberTool.isPositive(this.value);
  }
}
