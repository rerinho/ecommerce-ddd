import { ValueObject } from "../../../common/domain/ValueObject";
import { CpfTool } from "~/common/tools/CpfTool";

interface CpfProps {
  value: string;
}

export const INVALID_CPF_MESSAGE = "Invalid CPF.";

export class Cpf extends ValueObject<CpfProps> {
  static Create(cpf: string) {
    this.validateCpf(cpf);
    return new Cpf({ value: Cpf.removeNonNumericalCharacters(cpf) });
  }

  private static validateCpf(cpf: string) {
    if (!CpfTool.isValidCpf(cpf)) {
      throw new Error(INVALID_CPF_MESSAGE);
    }
  }

  private static removeNonNumericalCharacters(rawCpf: string) {
    return rawCpf.replace(/\D/g, "");
  }

  get value(): string {
    return this.props.value;
  }
}
