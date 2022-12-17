import {
  Discount,
  DiscountType,
} from "~/domain/entities/value-objects/Discount";
import { NominalDiscountCalculator } from "./NominalDiscountCalculator";
import { PercentageDiscountCalculator } from "./PercentageDiscountCalculator";

export class DiscountCalculatorFactory {
  static Create(discount: Discount) {
    switch (discount.type) {
      case DiscountType.Nominal:
        return new NominalDiscountCalculator();
      case DiscountType.Percentage:
        return new PercentageDiscountCalculator();
      default:
        throw new Error("There is no calculator for the entered discount");
    }
  }
}
