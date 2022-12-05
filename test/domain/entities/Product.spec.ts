import { VALID_CREATE_PRODUCT_OPTIONS } from "@test/utils/entity-generator/ProductGenerator";
import Product from "~/domain/entities/Product";
import {
  CreateDimensionOptions,
  Dimension,
} from "~/domain/entities/value-objects/Dimension";
import { Price } from "~/domain/entities/value-objects/Price";
import { Weight } from "~/domain/entities/value-objects/Weight";

describe("Product", () => {
  describe("should not allow creating a product with", () => {
    test.each([-1, 0])("a non positive price: %f", (price: number) => {
      expect(
        () =>
          new Product({
            ...VALID_CREATE_PRODUCT_OPTIONS,
            price: Price.Create(price),
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
              dimension: Dimension.Create({
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
              dimension: Dimension.Create({
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
              dimension: Dimension.Create({
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
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_OPTIONS,
              weight: Weight.Create(weight),
            })
        ).toThrowError(Error("weight must be a positive number."));
      });
    });
  });

  describe("should create a product with", () => {
    test("a positive price", () => {
      expect(
        new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          price: Price.Create(20),
        }).price.value
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
      });
    });

    test("a positive weight", () => {
      expect(
        new Product({
          ...VALID_CREATE_PRODUCT_OPTIONS,
          weight: Weight.Create(10),
        }).weight.value
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
          dimension: Dimension.Create({
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
