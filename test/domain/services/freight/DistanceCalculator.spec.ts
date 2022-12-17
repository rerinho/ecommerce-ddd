import { Coordinate } from "~/domain/entities/value-objects/Coordinate";
import DistanceCalculator from "~/domain/services/freight/DistanceCalculator";

describe("DistanceCalculator", () => {
  test("should calculate distance between two Coordinates", () => {
    const to = Coordinate.Create({ latitude: -27.5945, longitude: -48.5477 });
    const from = Coordinate.Create({ latitude: -22.9129, longitude: -43.2003 });

    expect(DistanceCalculator.calculate(from, to)).toBe(748.2217780081631);
  });
});
