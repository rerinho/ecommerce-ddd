import { Discount } from "~/domain/entities/value-objects/Discount";

export interface DiscountCalculator {
  calculate(value: number, discount: Discount): number;
}
