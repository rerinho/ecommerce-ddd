import { Cpf } from "~/domain/entities/value-objects/Cpf";

const VALID_CPF = "25505057004";

export function makeCpf(rawCpf?: string) {
  return Cpf.Create(VALID_CPF || rawCpf);
}
