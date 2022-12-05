import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";

interface SequenceProps {
  value: number;
}

export class Sequence extends ValueObject<SequenceProps> {
  static Create(sequence: number) {
    Guard.Create({ value: sequence, argumentName: "sequence" })
      .isInteger()
      .isPositive()
      .validate();

    return new Sequence({ value: sequence });
  }

  get value(): number {
    return this.props.value;
  }
}
