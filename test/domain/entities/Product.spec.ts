import {
  CreateDimensionOptions,
  Dimensions,
} from "~/domain/entities/value-objects/Dimensions";
import Product from "../../../src/domain/entities/Product";

const VALID_DIMENSIONS = Dimensions.Create({
  height: 1,
  width: 1,
  length: 1,
});

describe("Product", () => {
  describe("should not allow creating a product with", () => {
    test.each([{ price: -1 }, { price: 0 }])(
      "a non positive price: %f",
      ({ price }: { price: number }) => {
        expect(
          () =>
            new Product({
              description: "valid description",
              price,
              dimensions: VALID_DIMENSIONS,
            })
        ).toThrow(Error);
      }
    );

    describe("invalid description", () => {
      test("with length less than 1 characters", () => {
        expect(
          () =>
            new Product({
              description: "",
              price: 10,
              dimensions: VALID_DIMENSIONS,
            })
        ).toThrow(Error);
      });

      test("with length longer than 20 characters", () => {
        expect(
          () =>
            new Product({
              description: "A description with more than 20 characters",
              price: 10,
              dimensions: VALID_DIMENSIONS,
            })
        ).toThrow(Error);
      });
    });

    describe("invalid dimensions", () => {
      test("with non positive length", () => {
        expect(
          () =>
            new Product({
              description: "Valid description",
              price: 10,
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
              description: "Valid description",
              price: 10,
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
              description: "Valid description",
              price: 10,
              dimensions: Dimensions.Create({
                height: 0,
                length: 1,
                width: 1,
              }),
            })
        ).toThrowError(Error("height must be a positive number."));
      });
    });
  });

  describe("should create a product", () => {
    test("the price is positive", () => {
      expect(
        new Product({
          description: "valid description",
          price: 20,
          dimensions: VALID_DIMENSIONS,
        }).price
      ).toBe(20);
    });

    describe("a valid description", () => {
      test("with length equal than 1 characters", () => {
        expect(
          new Product({
            description: "A",
            price: 10,
            dimensions: VALID_DIMENSIONS,
          }).description
        ).toBe("A");
      });

      test("with length equal than 20 characters", () => {
        const product = new Product({
          description: "Exactly 20 character",
          price: 10,
          dimensions: VALID_DIMENSIONS,
        });

        expect(product.description).toBe("Exactly 20 character");
        expect(product.price).toBe(10);
      });
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
          description: "Valid description",
          price: 10,
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
