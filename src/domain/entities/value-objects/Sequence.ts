import { ValueObject } from "~/common/domain/ValueObject";
import { Guard } from "~/common/guard-clauses/GuardClauseBuilder";

interface SequenceProps {
  value: number;
}

export class Sequence extends ValueObject<SequenceProps> {
  static Create(sequence: number) {
    Guard.Argument(sequence, "sequence").isInteger().isPositive();

    return new Sequence({ value: sequence });
  }

  get value(): number {
    return this.props.value;
  }
}
