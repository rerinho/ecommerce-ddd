import {
  Discount,
  DiscountType,
} from "../../../src/domain/entities/value-objects/Discount";
import { DiscountCalculatorFactory } from "../../../src/domain/services/DiscountCalculatorFactory";
import { NominalDiscountCalculator } from "../../../src/domain/services/NominalDiscountCalculator";
import { PercentageDiscountCalculator } from "../../../src/domain/services/PercentageDiscountCalculator";

describe("DiscountCalculatorFactory ", () => {
  describe("should return correct calculator based on the discount type", () => {
    test.each([
      [
        DiscountType.Nominal,
        NominalDiscountCalculator.name,
        NominalDiscountCalculator,
      ],
      [
        DiscountType.Percentage,
        PercentageDiscountCalculator.name,
        PercentageDiscountCalculator,
      ],
    ])(
      "%s => %s",
      (discountType: DiscountType, _: string, expectedCalculator: any) => {
        const discount = Discount.Create({ type: discountType, value: 0.5 });

        expect(DiscountCalculatorFactory.Create(discount)).toBeInstanceOf(
          expectedCalculator
        );
      }
    );
  });
});
