import { UuidTool } from "~/shared/tools/UuidTool";
import { GuardClause } from "./abstract/GuardClause";

export const INVALID_UUID_MESSAGE = (argumentName: string) =>
  `${argumentName} its not a valid UUID.`;

export class IsValidUuid extends GuardClause {
  getGuardExceptionMessage(): string {
    return INVALID_UUID_MESSAGE(this.argumentName);
  }

  wasSatisfied(): boolean {
    return UuidTool.isValidUuid(this.value);
  }
}
