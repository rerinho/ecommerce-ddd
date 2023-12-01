import { ObjectTool } from "~/common/tools/ObjectTool";

describe("ObjectTool", () => {
  describe("isEqual", () => {
    test("should return true for equal objects with nested objects", () => {
      const objectA = {
        name: "John",
        age: 25,
        address: {
          city: "New York",
          zip: "10001",
        },
      };

      const objectB = {
        name: "John",
        age: 25,
        address: {
          city: "New York",
          zip: "10001",
        },
      };

      expect(ObjectTool.isEqual(objectA, objectB)).toBe(true);
    });

    test("should return false for different objects with nested objects", () => {
      const objectA = {
        name: "John",
        age: 25,
        address: {
          city: "New York",
          zip: "10001",
        },
      };

      const objectB = {
        name: "John",
        age: 25,
        address: {
          city: "Los Angeles",
          zip: "90001",
        },
      };

      expect(ObjectTool.isEqual(objectA, objectB)).toBe(false);
    });

    test("should return false for objects with different nested structures", () => {
      const objectA = {
        name: "John",
        age: 25,
        address: {
          city: "New York",
          zip: "10001",
        },
      };

      const objectB = {
        name: "John",
        address: {
          city: "New York",
        },
      };

      expect(ObjectTool.isEqual(objectA, objectB)).toBe(false);
    });
  });
});
