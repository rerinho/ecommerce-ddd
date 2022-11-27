import {
  CreateDimensionOptions,
  Dimensions,
} from "~/domain/entities/value-objects/Dimensions";
import Product, {
  CreateProductOptions,
} from "../../../src/domain/entities/Product";

// Constants
const VALID_DIMENSIONS = Dimensions.Create({
  height: 1,
  width: 1,
  length: 1,
});

const VALID_CREATE_PRODUCT_OPTIONS: CreateProductOptions = {
  description: "Valid description",
  dimensions: VALID_DIMENSIONS,
  price: 10,
  weight: 1,
};

describe("Product", () => {
  describe("should not allow creating a product with", () => {
    test.each([-1, 0])("a non positive price: %f", (price: number) => {
      expect(
        () =>
          new Product({
            ...VALID_CREATE_PRODUCT_OPTIONS,
            price,
          })
      ).toThrow(Error);
    });

    describe("invalid description", () => {
      test("with length less than 1 characters", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              description: "",
            })
        ).toThrow(Error);
      });

      test("with length longer than 20 characters", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              description: "A description with more than 20 characters",
            })
        ).toThrow(Error);
      });
    });

    describe("invalid dimensions", () => {
      test("with non positive length", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              dimensions: Dimensions.Create({
                height: 1,
                length: 0,
                width: 1,
              }),
            })
        ).toThrowError(Error("length must be a positive number."));
      });

      test("with non positive width", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              dimensions: Dimensions.Create({
                height: 1,
                length: 1,
                width: 0,
              }),
            })
        ).toThrowError(Error("width must be a positive number."));
      });

      test("with non positive height", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              dimensions: Dimensions.Create({
                height: 0,
                length: 1,
                width: 1,
              }),
            })
        ).toThrowError(Error("height must be a positive number."));
      });
    });

    describe("invalid weight", () => {
      test.each([[0], [-1]])("%d", (weight: number) => {
        expect(
          () => new Product({ ...VALID_CREATE_PRODUCT_OPTIONS, weight })
        ).toThrowError(Error("weight must be a positive number."));
      });
    });
  });

  describe("should create a product with", () => {
    test("a positive price", () => {
      expect(
        new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          price: 20,
        }).price
      ).toBe(20);
    });

    describe("a valid description", () => {
      test("with length equal than 1 characters", () => {
        expect(
          new Product({
            ...VALID_CREATE_PRODUCT_OPTIONS,
            description: "A",
          }).description
        ).toBe("A");
      });

      test("with length equal than 20 characters", () => {
        const product = new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          description: "Exactly 20 character",
        });

        expect(product.description).toBe("Exactly 20 character");
        expect(product.price).toBe(10);
      });
    });

    test("a positive weight", () => {
      expect(
        new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          weight: 10,
        }).weight
      ).toBe(10);
    });
  });

  describe("volume", () => {
    test.each([
      [
        {
          height: 1,
          width: 1,
          length: 1,
        },
        1,
      ],
      [
        {
          height: 0.5,
          width: 0.1,
          length: 1,
        },
        0.05,
      ],
      [
        {
          height: 5,
          width: 7,
          length: 1,
        },
        35,
      ],
      [
        {
          height: 0.72,
          width: 0.91,
          length: 1.25,
        },
        0.819,
      ],
    ])(
      "%s => %f m3",
      (
        { height, width, length }: CreateDimensionOptions,
        expectedValue: number
      ) => {
        const product = new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          dimensions: Dimensions.Create({
            height,
            length,
            width,
          }),
        });

        expect(product.volume).toBe(expectedValue);
      }
    );
  });
});
