import { v4 as uuid, validate, version as uuidVersion } from "uuid";

export class UuidTool {
  static generate(): string {
    return uuid();
  }

  static isValidUuid(uuid: string): boolean {
    return validate(uuid) && uuidVersion(uuid) === 4;
  }
}
