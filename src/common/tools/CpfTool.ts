import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class CpfTool {
  static isValidCpf(cpf: string) {
    return cpfValidator.isValid(cpf);
  }
}
