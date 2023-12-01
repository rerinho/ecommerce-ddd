import { NumberTool } from "~/common/tools/NumberTool";

describe('NumberTool', () => {
  describe('isInteger', () => {
    describe('should return false when a non integer number is entered', () => {
      test.each([-10.2, 0.1, -0.1, 10.99])("%d", (value: number) => {
        expect(NumberTool.isInteger(value)).toBe(false);
      });
    });

    describe('should return true when a integer number is entered', () => {
      test.each([-1, 0, 1, 10])("%d", (value: number) => {
        expect(NumberTool.isInteger(value)).toBe(true);
      });
    });
  });

  describe('isPositive', () => {
    describe('should return false when a non positive number is entered', () => {
      test.each([-1, 0])("%d", (value: number) => {
        expect(NumberTool.isPositive(value)).toBe(false);
      });
    });

    describe('should return true when a positive number is entered', () => {
      test.each([1, 10])("%d", (value: number) => {
        expect(NumberTool.isPositive(value)).toBe(true);
      });
    });
  });
});