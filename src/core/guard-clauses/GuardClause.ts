export type CreateGuardClauseInput = {
  value: unknown;
  argumentName: string;
};

export abstract class GuardClause {
  protected value: unknown;
  protected argumentName: unknown;

  constructor({ value, argumentName }: CreateGuardClauseInput) {
    this.value = value;
    this.argumentName = argumentName;
  }

  validate() {
    if (!this.wasSatisfied()) {
      const exceptionMessage = this.getGuardExceptionMessage();
      throw new Error(exceptionMessage);
    }
  }

  abstract wasSatisfied(): boolean;

  abstract getGuardExceptionMessage(): string;
}
