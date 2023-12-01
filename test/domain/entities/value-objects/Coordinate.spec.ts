import { VALID_CREATE_COORDINATE_ARGS } from "@test/utils/factories/value-object-factory/Coordinate";
import { Coordinate } from "~/domain/entities/value-objects/Coordinate";
import { IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE } from "~/shared/guard-clauses/clausules/IsGreaterThanOrEqualTo";
import { IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE } from "~/shared/guard-clauses/clausules/IsLessThanEqualTo";

describe("Coordinate", () => {
  describe("should not allow creating a Coordinate ", () => {
    describe("when the latitude is invalid", () => {
      test.each([
        [
          "less than te minimum",
          -90.01,
          IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE("latitude", -90),
        ],
        [
          "greater than te maximum",
          90.01,
          IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE("latitude", 90),
        ],
      ])(
        "%s: %d",
        (
          _: string,
          invalidLatitude: number,
          expectedExceptionMessage: string
        ) => {
          expect(() =>
            Coordinate.Create({
              ...VALID_CREATE_COORDINATE_ARGS,
              latitude: invalidLatitude,
            })
          ).toThrowError(Error(expectedExceptionMessage));
        }
      );
    });

    describe("when the longitude is invalid", () => {
      test.each([
        [
          "less than te minimum",
          -180.01,
          IS_GREATER_OR_EQUAL_THAN_ERROR_MESSAGE("longitude", -180),
        ],
        [
          "greater than te maximum",
          180.01,
          IS_LESS_OR_EQUAL_THAN_ERROR_MESSAGE("longitude", 180),
        ],
      ])(
        "%s: %d",
        (
          _: string,
          invalidLongitude: number,
          expectedExceptionMessage: string
        ) => {
          expect(() =>
            Coordinate.Create({
              ...VALID_CREATE_COORDINATE_ARGS,
              longitude: invalidLongitude,
            })
          ).toThrowError(Error(expectedExceptionMessage));
        }
      );
    });
  });

  test("should create a Coordinate instance when a valid latitude and longitude  values are entered", () => {
    const coordinate = Coordinate.Create(VALID_CREATE_COORDINATE_ARGS);

    expect(coordinate).toBeTruthy();
    expect(coordinate.latitude).toBe(VALID_CREATE_COORDINATE_ARGS.latitude);
    expect(coordinate.longitude).toBe(VALID_CREATE_COORDINATE_ARGS.longitude);
  });
});
