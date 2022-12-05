import { generateProduct } from "@test/utils/entity-generator/ProductGenerator";
import Product from "~/domain/entities/Product";
import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Weight } from "~/domain/entities/value-objects/Weight";
import {
  FreightCalculator,
  ShippingPackage,
} from "~/domain/services/freight/FreightCalculator";

// Constants
const GUITAR_PACKAGE = {
  weight: Weight.Create(3),
  dimension: Dimension.Create({
    height: 100,
    length: 10,
    width: 30,
  }),
};

const REFRIGERATOR_PACKAGE = {
  weight: Weight.Create(40),
  dimension: Dimension.Create({
    height: 200,
    length: 100,
    width: 50,
  }),
};

describe("FreightCalculator", () => {
  describe("should calculate freight correctly", () => {
    test.each([
      [[GUITAR_PACKAGE], 30],
      [[REFRIGERATOR_PACKAGE], 400],
      [[REFRIGERATOR_PACKAGE, GUITAR_PACKAGE], 430],
    ])(
      "%s => R$ %f",
      (shippingPackages: ShippingPackage[], expectedFreight: number) => {
        expect(FreightCalculator.calculate(shippingPackages)).toBe(
          expectedFreight
        );
      }
    );

    describe("when the calculated freight is less than the minimum", () => {
      test("should return the minimum freight value => R$ 10,00", () => {
        const shippingPackage = {
          weight: Weight.Create(1),
          dimension: Dimension.Create({
            height: 20,
            length: 15,
            width: 10,
          }),
        };

        expect(FreightCalculator.calculate([shippingPackage])).toBe(
          FreightCalculator.MIN_FREIGHT_VALUE
        );
      });
    });
  });
});
