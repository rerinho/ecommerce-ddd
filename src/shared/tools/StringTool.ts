export class StringTool {
  static hasLengthSmallOrEqualTo(value: unknown, length: number) {
    return typeof value === "string" && value.length <= length;
  }

  static hasLengthBigOrEqualTo(value: unknown, length: number) {
    return typeof value === "string" && value.length >= length;
  }
}
