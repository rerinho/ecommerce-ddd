import { Discount } from "~/domain/entities/value-objects/Discount";
import { DiscountCalculator } from "~/domain/services/discount/DiscountCalculator";
import { PercentageDiscountCalculator } from "~/domain/services/discount/PercentageDiscountCalculator";

const makePercentageDiscountCalculator = () => {
  return new PercentageDiscountCalculator();
};

describe("PercentageDiscountCalculator", () => {
  describe("calculate", () => {
    describe("should calculate discount correctly for a product that costs 100", () => {
      it.each([
        [0.1, 10],
        [0.49, 49],
        [0.5, 50],
        [0.99, 99],
        [1, 100],
      ])(
        "Percentual discount: %f; Expected discount amount: %f",
        (discountValue: number, expectedDiscountValue: number) => {
          const price = 100;
          const discount = Discount.Create(discountValue);
          expect(
            makePercentageDiscountCalculator().calculate(price, discount)
          ).toBe(expectedDiscountValue);
        }
      );
    });
  });
});
