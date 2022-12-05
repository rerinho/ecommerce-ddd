import { DiscountCalculatorFactory } from "~/domain/services/discount/DiscountCalculatorFactory";
import { NominalDiscountCalculator } from "~/domain/services/discount/NominalDiscountCalculator";
import { PercentageDiscountCalculator } from "~/domain/services/discount/PercentageDiscountCalculator";
import {
  Discount,
  DiscountType,
} from "../../../../src/domain/entities/value-objects/Discount";

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
