import { Guard } from "../../../shared/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface CpfProps {
  value: string;
}

export class Cpf extends ValueObject<CpfProps> {
  static Create(cpf: string) {
    Guard.Create({ value: cpf, argumentName: "cpf" }).isValidCpf().validate();

    return new Cpf({ value: Cpf.removeNonNumericalCharacters(cpf) });
  }

  private static removeNonNumericalCharacters(rawCpf: string) {
    return rawCpf.replace(/\D/g, "");
  }

  get value(): string {
    return this.props.value;
  }
}
