import { CREATE_ORDEM_ITEM_ARGS } from "@test/utils/factories/entity-factory/OrderItemFactory";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";

import { OrderItem } from "../../../src/domain/entities/OrderItem";

describe("OrderItem", () => {
  test("should throw error when a the entered quantity is invalid", () => {
    expect(
      () =>
        new OrderItem({
          ...CREATE_ORDEM_ITEM_ARGS,
          quantity: Quantity.Create(0),
        })
    ).toThrowError(Error("quantity must be a positive number."));
  });

  test("should create an OrderItem instance when a valid product and quantity are entered", () => {
    const orderItem = new OrderItem({
      ...CREATE_ORDEM_ITEM_ARGS,
      quantity: Quantity.Create(1),
    });

    expect(orderItem).toBeTruthy();
    expect(orderItem.quantity).toBe(1);
  });

  test("should calculate total value correctly based on the price of the product", () => {
    const orderItem = new OrderItem({
      ...CREATE_ORDEM_ITEM_ARGS,
      price: Price.Create(50),
      quantity: Quantity.Create(3),
    });

    expect(orderItem).toBeTruthy();
    expect(orderItem.total).toBe(150);
  });
});
