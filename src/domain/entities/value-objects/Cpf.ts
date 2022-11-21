import { Guard } from "../../../core/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../core/ValueObject";

interface CpfProps {
  value: string;
}

export class Cpf extends ValueObject<CpfProps> {
  static Create(cpf: string) {
    Guard.Create({ value: cpf, argumentName: "cpf" }).isValidCpf().validate();

    return new Cpf({ value: cpf });
  }

  get value(): string {
    return this.props.value;
  }
}
