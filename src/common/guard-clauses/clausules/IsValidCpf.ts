import { CpfTool } from "../../tools/CpfTool";
import { GuardClause } from "./abstract/GuardClause";

export class IsValidCpf extends GuardClause {
  getGuardExceptionMessage(): string {
    return `${this.argumentName} its not a valid CPF.`;
  }

  wasSatisfied(): boolean {
    return typeof this.value === "string" && CpfTool.isValidCpf(this.value);
  }
}
