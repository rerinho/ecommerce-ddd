import { Sequence } from "~/domain/entities/value-objects/Sequence";
import { IS_INTEGER_ERROR_MESSAGE } from "~/shared/guard-clauses/clausules/IsInteger";
import { IS_POSITIVE_ERROR_MESSAGE } from "~/shared/guard-clauses/clausules/IsPositive";

describe("Sequence", () => {
  describe("should throw an error", () => {
    describe("when the entered sequence is non-positive", () => {
      test.each([[0], [-1]])("%s", (sequence: number) => {
        expect(() => Sequence.Create(sequence)).toThrow(
          Error(IS_POSITIVE_ERROR_MESSAGE("sequence"))
        );
      });
    });

    describe("when the entered sequence is non integer", () => {
      test.each([[0.1], [1.1]])("%s", (sequence: number) => {
        expect(() => Sequence.Create(sequence)).toThrow(
          Error(IS_INTEGER_ERROR_MESSAGE("sequence"))
        );
      });
    });
  });

  describe("should create a Sequence instance when a valid sequence value is entered", () => {
    test.each([[1], [2], [999]])("%s", (rawSequence: number) => {
      const sequence = Sequence.Create(rawSequence);

      expect(sequence.value).toBe(rawSequence);
    });
  });
});
