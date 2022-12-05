import { ValueObject } from "~/shared/domain/ValueObject";
import { Sequence } from "./Sequence";

interface OrderCodeProps {
  value: string;
}

export class OrderCode extends ValueObject<OrderCodeProps> {
  static Create(sequence: Sequence) {
    return new OrderCode({ value: OrderCode.generateCode(sequence) });
  }

  private static generateCode(sequence: Sequence) {
    const now = new Date();
    return `${now.getFullYear()}${String(sequence.value).padStart(8, "0")}`;
  }

  get value(): string {
    return this.props.value;
  }
}
