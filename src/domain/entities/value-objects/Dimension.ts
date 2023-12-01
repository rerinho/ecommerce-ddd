import { ValueObject } from "~/common/domain/ValueObject";
import { Guard } from "~/common/guard-clauses/GuardClauseBuilder";

interface DimensionProps {
  heightInMeters: number;
  widthInMeters: number;
  lengthInMeters: number;
}

export interface CreateDimensionArgs {
  heightInMeters: number;
  widthInMeters: number;
  lengthInMeters: number;
}

export class Dimension extends ValueObject<DimensionProps> {
  static Create({
    heightInMeters,
    lengthInMeters,
    widthInMeters,
  }: CreateDimensionArgs) {
    Guard.Argument(heightInMeters, "heightInMeters").isPositive();
    Guard.Argument(widthInMeters, "widthInMeters").isPositive();
    Guard.Argument(lengthInMeters, "lengthInMeters").isPositive();

    return new Dimension({
      heightInMeters,
      lengthInMeters,
      widthInMeters,
    });
  }

  get volume(): number {
    return (
      this.props.heightInMeters *
      this.props.widthInMeters *
      this.props.lengthInMeters
    );
  }

  get height(): number {
    return this.props.heightInMeters;
  }

  get width(): number {
    return this.props.widthInMeters;
  }

  get length(): number {
    return this.props.lengthInMeters;
  }
}
