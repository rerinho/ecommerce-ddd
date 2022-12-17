import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";

interface DimensionProps {
  height: number;
  width: number;
  length: number;
}

export interface CreateDimensionArgs {
  height: number;
  width: number;
  length: number;
}

export class Dimension extends ValueObject<DimensionProps> {
  static Create({ height, length, width }: CreateDimensionArgs) {
    Guard.Create({ argumentName: "height", value: height })
      .isPositive()
      .validate();
    Guard.Create({ argumentName: "width", value: width })
      .isPositive()
      .validate();
    Guard.Create({ argumentName: "length", value: length })
      .isPositive()
      .validate();

    return new Dimension({
      height,
      length,
      width,
    });
  }

  get volume(): number {
    return this.props.height * this.props.width * this.props.length;
  }

  get height(): number {
    return this.props.height;
  }

  get width(): number {
    return this.props.width;
  }

  get length(): number {
    return this.props.length;
  }
}
