import { Guard } from "../guard-clauses/GuardClauseBuilder";
import { UuidTool } from "../tools/UuidTool";
import { ValueObject } from "./ValueObject";

interface UuidProps {
  value: string;
}

export class Uuid extends ValueObject<UuidProps> {
  static Create(id: string) {
    if (id) {
      Guard.Create({ argumentName: "uuid", value: id })
        .isValidUuid()
        .validate();
    }

    return new Uuid({ value: id });
  }

  get value(): string {
    return this.props.value;
  }
}
