import { GuardClause } from "./GuardClause";

export class IsValidCpf extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} its not a valid CPF..`;
  }

  wasSatisfied(): boolean {
    return this.isValidCpf(this.value);
  }

  private isValidCpf(value: unknown) {
    if (value === null || value === undefined || typeof value !== "string") {
      return false;
    }

    const cpf: string = this.removeNonNumericCharacters(value as string);

    if (!this.hasValidLength(cpf) || this.isCpfFormedByASingleNumber(cpf)) {
      return false;
    }

    try {
      let d1, d2;
      let dg1, dg2, rest;
      let digito;
      let nDigResult;
      d1 = d2 = 0;
      dg1 = dg2 = rest = 0;

      cpf.split("").forEach((digit, index) => {});
      for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
        digito = parseInt(cpf.substring(nCount - 1, nCount));
        d1 = d1 + (11 - nCount) * digito;

        d2 = d2 + (12 - nCount) * digito;
      }

      rest = d1 % 11;

      dg1 = rest < 2 ? (dg1 = 0) : 11 - rest;
      d2 += 2 * dg1;
      rest = d2 % 11;
      if (rest < 2) dg2 = 0;
      else dg2 = 11 - rest;

      let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
      nDigResult = "" + dg1 + "" + dg2;
      return nDigVerific == nDigResult;
    } catch (e) {
      console.error("Erro !" + e);
      return false;
    }
  }

  private removeNonNumericCharacters(cpf: string) {
    return cpf.replace(/[^0-9]/g, "");
  }

  private isCpfFormedByASingleNumber(cpf: string) {
    return cpf.split("").every((char) => char === cpf[0]);
  }

  private hasValidLength(cpf: string) {
    return cpf.length === 11;
  }
}
