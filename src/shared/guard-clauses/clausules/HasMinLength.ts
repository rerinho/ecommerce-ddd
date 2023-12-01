import { StringTool } from "../../tools/StringTool";
import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export class HasMinLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseOptions & { minLength: number }) {
    super(input);
    this.length = input.minLength;
  }

  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be shorter than  ${this.length}.`;
  }

  wasSatisfied(): boolean {
    return (
      typeof this.value === "string" &&
      StringTool.hasLengthBigOrEqualTo(this.value, this.length)
    );
  }
}
