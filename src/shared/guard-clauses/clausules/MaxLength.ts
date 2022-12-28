import { StringTool } from "../../tools/StringTool";
import { CreateGuardClauseOptions, GuardClause } from "./abstract/GuardClause";

export class MaxLength extends GuardClause {
  private length: number;

  constructor(input: CreateGuardClauseOptions & { maxLength: number }) {
    super(input);
    this.length = input.maxLength;
  }

  getGuardExceptionMessage(): string {
    return `${this.argumentName} cannot be longer than  ${this.length}.`;
  }

  wasSatisfied(): boolean {
    return (
      typeof this.value === "string" &&
      StringTool.hasLengthSmallOrEqualTo(this.value, this.length)
    );
  }
}
