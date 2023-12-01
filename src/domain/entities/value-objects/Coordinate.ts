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
    Guard.Argument(latitude, "latitude")
      .isGreaterThanOrEqualTo(-90)
      .isLessThanOrEqualTo(90);
    Guard.Argument(longitude, "longitude")
      .isGreaterThanOrEqualTo(-180)
      .isLessThanOrEqualTo(180);

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
