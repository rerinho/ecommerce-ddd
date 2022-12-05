import { Discount } from "~/domain/entities/value-objects/Discount";
import { DiscountCalculator } from "./DiscountCalculator";

export class NominalDiscountCalculator implements DiscountCalculator {
  calculate(_: number, discount: Discount): number {
    return discount.value;
  }
}
