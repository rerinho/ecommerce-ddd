import { CreateOrdemItemOptions, OrderItem } from "~/domain/entities/OrderItem";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { generateProductId } from "../value-generator/ProductIdGenerator";

export const CREATE_ORDEM_ITEM_OPTIONS: CreateOrdemItemOptions = {
  price: Price.Create(50),
  quantity: Quantity.Create(1),
  productId: generateProductId(),
};

export function generateOrderItem(options?: Partial<CreateOrdemItemOptions>) {
  return new OrderItem({ ...CREATE_ORDEM_ITEM_OPTIONS, ...options });
}
