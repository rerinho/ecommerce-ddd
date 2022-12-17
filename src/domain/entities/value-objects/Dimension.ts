import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";

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
    Guard.Create({ argumentName: "heightInMeters", value: heightInMeters })
      .isPositive()
      .validate();
    Guard.Create({ argumentName: "widthInMeters", value: widthInMeters })
      .isPositive()
      .validate();
    Guard.Create({ argumentName: "lengthInMeters", value: lengthInMeters })
      .isPositive()
      .validate();

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
