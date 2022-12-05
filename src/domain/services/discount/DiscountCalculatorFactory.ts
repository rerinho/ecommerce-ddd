import {
  Discount,
  DiscountType,
} from "~/domain/entities/value-objects/Discount";
import { NominalDiscountCalculator } from "./NominalDiscountCalculator";
import { PercentageDiscountCalculator } from "./PercentageDiscountCalculator";

export class DiscountCalculatorFactory {
  static Create(discount: Discount) {
    if (discount.type === DiscountType.Nominal) {
      return new NominalDiscountCalculator();
    }

    return new PercentageDiscountCalculator();
  }
}
