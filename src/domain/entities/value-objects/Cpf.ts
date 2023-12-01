import { Guard } from "../../../common/guard-clauses/GuardClauseBuilder";
import { ValueObject } from "../../../common/domain/ValueObject";

interface CpfProps {
  value: string;
}

export class Cpf extends ValueObject<CpfProps> {
  static Create(cpf: string) {
    Guard.Argument(cpf, "cpf").isValidCpf();

    return new Cpf({ value: Cpf.removeNonNumericalCharacters(cpf) });
  }

  private static removeNonNumericalCharacters(rawCpf: string) {
    return rawCpf.replace(/\D/g, "");
  }

  get value(): string {
    return this.props.value;
  }
}
