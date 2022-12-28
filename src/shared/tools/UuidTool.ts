import { v4 as uuid, validate, version as uuidVersion } from "uuid";

export class UuidTool {
  static generate() {
    return uuid();
  }

  static isValidUuid(uuid: string) {
    return validate(uuid) && uuidVersion(uuid) === 4;
  }
}
