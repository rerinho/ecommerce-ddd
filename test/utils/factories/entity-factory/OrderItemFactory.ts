import { CreateOrdemItemArgs, OrderItem } from "~/domain/entities/OrderItem";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { makeProductId } from "../value-object-factory/ProductIdFactory";

export const VALID_CREATE_ORDEM_ITEM_ARGS: CreateOrdemItemArgs = {
  price: Price.Create(50),
  quantity: Quantity.Create(1),
  productId: makeProductId(),
};

export function makeOrderItem(options?: Partial<CreateOrdemItemArgs>) {
  return new OrderItem({ ...VALID_CREATE_ORDEM_ITEM_ARGS, ...options });
}
