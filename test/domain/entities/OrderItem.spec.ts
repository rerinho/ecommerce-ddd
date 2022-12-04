import { generateProduct } from "@test/utils/entity-generator/product.generator";
import { Price } from "~/domain/entities/value-objects/Price";

import { OrderItem } from "../../../src/domain/entities/OrderItem";

// Constants
const PRODUCT = generateProduct();

describe("OrderItem", () => {
  test("should throw error when a the entered quantity is invalid", () => {
    expect(() => new OrderItem(PRODUCT, 0)).toThrowError(
      Error("quantity must be a positive number.")
    );
  });

  test("should create an OrderItem instance when a valid product and quantity are entered", () => {
    const orderItem = new OrderItem(PRODUCT, 1);

    expect(orderItem).toBeTruthy();
    expect(orderItem.quantity).toBe(1);
  });

  test("should calculate total value correctly based on the price of the product", () => {
    const orderItem = new OrderItem(PRODUCT, 3);

    expect(orderItem).toBeTruthy();
    expect(orderItem.total).toBe(150);
  });
});
