import Product from "../../src/domain/entities/Product";

describe("Product", () => {
  describe("Should not allow creating a product with", () => {
    test("a non positive price", () => {
      expect(() => new Product("valid description", -1)).toThrow(Error);
    });

    test("a non positive price", () => {
      expect(() => new Product("valid description", 0)).toThrow(Error);
    });

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

  describe("Should create a product", () => {
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
