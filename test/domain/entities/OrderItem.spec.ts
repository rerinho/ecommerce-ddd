import { OrderItem } from "../../../src/domain/entities/OrderItem";
import Product from "../../../src/domain/entities/Product";

describe("OrderItem", () => {
  test("should throw error when a the entered quantity is invalid", () => {
    const product = new Product("A valid description", 50);

    expect(() => new OrderItem(product, 0)).toThrowError(
      Error("quantity must be a positive number.")
    );
  });

  test("should create an OrderItem instance when a valid product and quantity are entered", () => {
    const product = new Product("A valid description", 50);

    const orderItem = new OrderItem(product, 1);

    expect(orderItem).toBeTruthy();
    expect(orderItem.quantity).toBe(1);
  });

  test("should calculate total value correctly based on the price of the product", () => {
    const product = new Product("A valid description", 50);

    const orderItem = new OrderItem(product, 3);

    expect(orderItem).toBeTruthy();
    expect(orderItem.total).toBe(150);
  });
});
