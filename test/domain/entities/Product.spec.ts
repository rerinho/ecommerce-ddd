import Product from "../../../src/domain/entities/Product";

describe("Product", () => {
  describe("should not allow creating a product with", () => {
    test.each([{ price: -1 }, { price: 0 }])(
      "a non positive price: %f",
      ({ price }: { price: number }) => {
        expect(() => new Product("valid description", price)).toThrow(Error);
      }
    );

    describe("invalid description", () => {
      test("with length less than 1 characters", () => {
        expect(() => new Product("", 10)).toThrow(Error);
      });

      test("with length longer than 20 characters", () => {
        expect(
          () => new Product("A description with more than 20 characters", 10)
        ).toThrow(Error);
      });
    });
  });

  describe("should create a product", () => {
    test("the price is positive", () => {
      expect(new Product("valid description", 20).price).toBe(20);
    });

    describe("a valid description", () => {
      test("with length equal than 1 characters", () => {
        expect(new Product("A", 10).description).toBe("A");
      });

      test("with length equal than 20 characters", () => {
        const product = new Product("Exactly 20 character", 10);

        expect(product.description).toBe("Exactly 20 character");
        expect(product.price).toBe(10);
      });
    });
  });
});
