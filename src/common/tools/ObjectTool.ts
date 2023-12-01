import { isEqual as lodashIsEqual } from "lodash";

export class ObjectTool {
  static isEqual(
    objectA: Record<string, any>,
    objectB: Record<string, any>
  ): boolean {
    return lodashIsEqual(objectA, objectB);
  }
}
