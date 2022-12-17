import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";

export interface CoordinateProps {
  latitude: number;
  longitude: number;
}

export interface CreateCoordinateArgs {
  latitude: number;
  longitude: number;
}

export class Coordinate extends ValueObject<CoordinateProps> {
  static Create({ latitude, longitude }: CreateCoordinateArgs) {
    Guard.Create({ value: latitude, argumentName: "latitude" })
      .greaterOrEqualThan(-90)
      .lessOrEqualThan(90)
      .validate();

    Guard.Create({ value: longitude, argumentName: "longitude" })
      .greaterOrEqualThan(-180)
      .lessOrEqualThan(180)
      .validate();

    return new Coordinate({ latitude, longitude });
  }

  get value(): CoordinateProps {
    return this.props;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }
}
