import { CreateOrderArgs, Order } from "~/domain/entities/Order";
import { Sequence } from "~/domain/entities/value-objects/Sequence";
import { makeCpf } from "../value-object-factory/CpfFactory";

export const VALID_CREATE_ORDER_ARGS: CreateOrderArgs = {
  customerCpf: makeCpf(),
  orderSequence: Sequence.Create(1),
};

export function makeOrderItem(options?: Partial<CreateOrderArgs>) {
  return new Order({ ...VALID_CREATE_ORDER_ARGS, ...options });
}
