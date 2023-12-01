import { isInteger as lodashIsInteger } from "lodash";

export class NumberTool {
  static isPositive(value: number) {
    return value > 0;
  }

  static isInteger(value: number) {
    return lodashIsInteger(value);
  }
}
