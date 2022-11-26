import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class CpfTool {
  static isValidCpf(cpf: unknown) {
    return typeof cpf === "string" && cpfValidator.isValid(cpf);
  }
}
