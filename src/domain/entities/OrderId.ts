import { ValueObject } from "~/shared/domain/ValueObject";
import { Guard } from "~/shared/guard-clauses/GuardClauseBuilder";
import { UuidTool } from "~/shared/tools/UuidTool";

interface OrderIdProps {
  value: string;
}

export class OrderId extends ValueObject<OrderIdProps> {
  static Create(id?: string) {
    if (id) {
      Guard.Create({ argumentName: "orderId", value: id })
        .isValidUuid()
        .validate();
    }

    return new OrderId({ value: id || UuidTool.generate() });
  }

  get value(): string {
    return this.props.value;
  }
}
