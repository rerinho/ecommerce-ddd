import { ValueObject } from "~/common/domain/ValueObject";
import { Guard } from "~/common/guard-clauses/GuardClauseBuilder";
import { randomUUID } from "crypto";

interface OrderIdProps {
  value: string;
}

export class OrderId extends ValueObject<OrderIdProps> {
  static Create(id?: string) {
    if (id) {
      Guard.Argument(id, "orderId").isValidUuid();
    }

    return new OrderId({ value: id || randomUUID() });
  }

  get value(): string {
    return this.props.value;
  }
}
