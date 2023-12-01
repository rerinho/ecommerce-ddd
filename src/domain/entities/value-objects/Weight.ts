import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface WeightProps {
  value: number;
  measurementType: WeightMeasures;
}

export enum WeightMeasures {
  Kilogram = "KILOGRAM",
}

export class Weight extends ValueObject<WeightProps> {
  static Create(weight: number) {
    Guard.Argument(weight, "weight").isPositive();

    return new Weight({
      value: weight,
      measurementType: WeightMeasures.Kilogram,
    });
  }

  get value(): number {
    return this.props.value;
  }

  get measurementType(): WeightMeasures {
    return this.props.measurementType;
  }
}
