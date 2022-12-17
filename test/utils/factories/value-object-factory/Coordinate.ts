import {
  Coordinate,
  CreateCoordinateArgs,
} from "~/domain/entities/value-objects/Coordinate";

export const VALID_CREATE_COORDINATE_ARGS: CreateCoordinateArgs = {
  latitude: 90,
  longitude: 180,
};

export function makeCoordinate(options?: Partial<CreateCoordinateArgs>) {
  return Coordinate.Create({
    ...VALID_CREATE_COORDINATE_ARGS,
    ...options,
  });
}
