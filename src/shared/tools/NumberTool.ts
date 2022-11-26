import { isInteger as lodashIsInteger } from "lodash";

export class NumberTool {
  static isPositive(value: unknown) {
    return typeof value === "number" && value > 0;
  }

  static isInteger(value: unknown) {
    return lodashIsInteger(value);
  }
}
