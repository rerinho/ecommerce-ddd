import { GuardClause } from "./abstract/GuardClause";

export const INVALID_UUID_MESSAGE = (argumentName: string) =>
  `${argumentName} its not a valid UUID.`;

export class IsValidUuid extends GuardClause {
  getGuardExceptionMessage(): string {
    return INVALID_UUID_MESSAGE(this.argumentName);
  }

  wasSatisfied(): boolean {
    return typeof this.value === "string" && this.isValidUuid(this.value);
  }

  private isValidUuid(uuid: string) {
    const UUIDv4Regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return Boolean(uuid.match(UUIDv4Regex));
  }
}
