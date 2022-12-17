import { VALID_CREATE_PRODUCT_ARGS } from "@test/utils/factories/entity-factory/ProductFactory";
import Product from "~/domain/entities/Product";
import {
  CreateDimensionArgs,
  Dimension,
} from "~/domain/entities/value-objects/Dimension";
import { Price } from "~/domain/entities/value-objects/Price";
import { ProductDescription } from "~/domain/entities/value-objects/ProductDescription";
import { Weight } from "~/domain/entities/value-objects/Weight";

describe("Product", () => {
  describe("should not allow creating a product with", () => {
    test.each([-1, 0])("a non positive price: %f", (price: number) => {
      expect(
        () =>
          new Product({
            ...VALID_CREATE_PRODUCT_ARGS,
            price: Price.Create(price),
          })
      ).toThrow(Error);
    });

    describe("invalid description", () => {
      test("with length less than 1 characters", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
              description: ProductDescription.Create(""),
            })
        ).toThrow(Error);
      });

      test("with length longer than 20 characters", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
              description: ProductDescription.Create(
                "A description with more than 20 characters"
              ),
            })
        ).toThrow(Error);
      });
    });

    describe("invalid dimensions", () => {
      test("with non positive length", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
              dimension: Dimension.Create({
                heightInMeters: 1,
                lengthInMeters: 0,
                widthInMeters: 1,
              }),
            })
        ).toThrowError(Error("lengthInMeters must be a positive number."));
      });

      test("with non positive width", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
              dimension: Dimension.Create({
                heightInMeters: 1,
                lengthInMeters: 1,
                widthInMeters: 0,
              }),
            })
        ).toThrowError(Error("widthInMeters must be a positive number."));
      });

      test("with non positive height", () => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
              dimension: Dimension.Create({
                heightInMeters: 0,
                lengthInMeters: 1,
                widthInMeters: 1,
              }),
            })
        ).toThrowError(Error("heightInMeters must be a positive number."));
      });
    });

    describe("invalid weight", () => {
      test.each([[0], [-1]])("%d", (weight: number) => {
        expect(
          () =>
            new Product({
              ...VALID_CREATE_PRODUCT_ARGS,
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
          ...VALID_CREATE_PRODUCT_ARGS,
          price: Price.Create(20),
        }).price.value
      ).toBe(20);
    });

    describe("a valid description", () => {
      test("with length equal than 1 characters", () => {
        const product = new Product({
          ...VALID_CREATE_PRODUCT_ARGS,
          description: ProductDescription.Create("A"),
        });

        expect(product.description.value).toBe("A");
      });

      test(`with length equal than 20 characters`, () => {
        const product = new Product({
          ...VALID_CREATE_PRODUCT_ARGS,
          description: ProductDescription.Create("Exactly 20 character"),
        });

        expect(product.description.value).toBe("Exactly 20 character");
      });
    });

    test("a positive weight", () => {
      expect(
        new Product({
          ...VALID_CREATE_PRODUCT_ARGS,
          weight: Weight.Create(10),
        }).weight.value
      ).toBe(10);
    });
  });

  describe("volume", () => {
    test.each([
      [
        {
          heightInMeters: 1,
          widthInMeters: 1,
          lengthInMeters: 1,
        },
        1,
      ],
      [
        {
          heightInMeters: 0.5,
          widthInMeters: 0.1,
          lengthInMeters: 1,
        },
        0.05,
      ],
      [
        {
          heightInMeters: 5,
          widthInMeters: 7,
          lengthInMeters: 1,
        },
        35,
      ],
      [
        {
          heightInMeters: 0.72,
          widthInMeters: 0.91,
          lengthInMeters: 1.25,
        },
        0.819,
      ],
    ])(
      "%s => %f m3",
      (
        { heightInMeters, widthInMeters, lengthInMeters }: CreateDimensionArgs,
        expectedValue: number
      ) => {
        const product = new Product({
          ...VALID_CREATE_PRODUCT_ARGS,
          dimension: Dimension.Create({
            heightInMeters,
            lengthInMeters,
            widthInMeters,
          }),
        });

        expect(product.volume).toBe(expectedValue);
      }
    );
  });
});
