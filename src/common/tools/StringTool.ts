export class StringTool {
  static hasLengthSmallOrEqualTo(value: string, length: number) {
    return value.length <= length;
  }

  static hasLengthBigOrEqualTo(value: string, length: number) {
    return value.length >= length;
  }
}
