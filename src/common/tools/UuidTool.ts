import { randomUUID } from "crypto";

export class UuidTool {
  private static UUIDv4Regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  static generate(): string {
    return randomUUID();
  }

  static isValidUuid(uuid: string): boolean {
    return Boolean(uuid.match(this.UUIDv4Regex));
  }
}
