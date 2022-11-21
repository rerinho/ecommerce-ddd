// TODO: check possibility to use class-validator lib here

export function isNull(value: any): boolean {
  return value === null;
}

export function isUndefined(value: any): boolean {
  return value === undefined;
}

export function hasLengthSmallOrEqualTo(value: unknown, length: number) {
  return typeof value === "string" && value.length <= length;
}

export function hasLengthBigOrEqualTo(value: unknown, length: number) {
  return typeof value === "string" && value.length >= length;
}

export function isPositive(value: unknown) {
  return typeof value === "number" && value > 0;
}

export function isBiggerThan(value: unknown, min: number) {
  return typeof value === "number" && value > min;
}
