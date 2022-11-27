import { Dimensions } from "~/domain/entities/value-objects/Dimensions";
import { OrderItem } from "../../../src/domain/entities/OrderItem";
import Product from "../../../src/domain/entities/Product";

// Constants
const PRODUCT = new Product({
  description: "A valid description",
  price: 50,
  dimensions: Dimensions.Create({
    height: 1,
    length: 1,
    width: 1,
  }),
  weight: 1,
});

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
