import { UuidTool } from "~/shared/tools/UuidTool";
import { GuardClause } from "./abstract/GuardClause";

export class IsValidUuid extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} its not a valid UUID.`;
  }

  wasSatisfied(): boolean {
    return UuidTool.isValidUuid(this.value);
  }
}
