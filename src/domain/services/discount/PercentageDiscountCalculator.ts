import { Discount } from "~/domain/entities/value-objects/Discount";
import { DiscountCalculator } from "./DiscountCalculator";

export class PercentageDiscountCalculator implements DiscountCalculator {
  calculate(amount: number, discount: Discount): number {
    return amount * discount.value;
  }
}
