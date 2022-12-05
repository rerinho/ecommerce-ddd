import { generateProduct } from "@test/utils/entity-generator/ProductGenerator";
import Product from "~/domain/entities/Product";
import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Weight } from "~/domain/entities/value-objects/Weight";
import { FreightCalculator } from "~/domain/services/freight/FreightCalculator";

// Constants
const GUITAR = generateProduct({
  weight: Weight.Create(3),
  dimension: Dimension.Create({
    height: 100,
    length: 10,
    width: 30,
  }),
});

const REFRIGERATOR = generateProduct({
  weight: Weight.Create(40),
  dimension: Dimension.Create({
    height: 200,
    length: 100,
    width: 50,
  }),
});

describe("FreightCalculator", () => {
  describe("should calculate freight correctly", () => {
    test.each([
      [GUITAR, 30],
      [REFRIGERATOR, 400],
    ])("%s => R$ %f", (product: Product, expectedFreight: number) => {
      const shippingPackage = {
        dimension: product.dimension,
        weight: product.weight,
      };
      expect(FreightCalculator.calculate([shippingPackage])).toBe(
        expectedFreight
      );
    });

    describe("when the calculated freight is less than the minimum", () => {
      test("should return the minimum freight value => R$ 10,00", () => {
        const camera = generateProduct({
          weight: Weight.Create(1),
          dimension: Dimension.Create({
            height: 20,
            length: 15,
            width: 10,
          }),
        });

        const shippingPackage = {
          dimension: camera.dimension,
          weight: camera.weight,
        };

        expect(FreightCalculator.calculate([shippingPackage])).toBe(
          FreightCalculator.MIN_FREIGHT_VALUE
        );
      });
    });
  });
});
