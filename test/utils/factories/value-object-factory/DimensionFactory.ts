import {
  CreateDimensionArgs,
  Dimension,
} from "~/domain/entities/value-objects/Dimension";

export const VALID_CREATE_DIMENSION_ARGS: CreateDimensionArgs = {
  heightInMeters: 1,
  lengthInMeters: 1,
  widthInMeters: 1,
};

export function makeDimension(options?: Partial<CreateDimensionArgs>) {
  return Dimension.Create({
    ...VALID_CREATE_DIMENSION_ARGS,
    ...options,
  });
}
