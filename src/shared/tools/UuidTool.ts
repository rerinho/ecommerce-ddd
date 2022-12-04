import { v4 as uuid, validate } from "uuid";

export class UuidTool {
  static generate() {
    return uuid();
  }

  static isValidUuid(uuid: unknown) {
    return typeof uuid === "string" && validate(uuid);
  }
}
