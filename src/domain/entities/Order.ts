import { DiscountCalculatorFactory } from "../services/DiscountCalculatorFactory";
import { Coupon } from "./Coupon";
import { OrderItem as OrderItem } from "./OrderItem";
import Product from "./Product";
import { Cpf } from "./value-objects/Cpf";
import { DiscountType } from "./value-objects/Discount";

export class Order {
  private customerCpf: Cpf;
  private coupon?: Coupon;
  private _orderItems: OrderItem[] = [];

  constructor(customerCpf: string) {
    this.customerCpf = Cpf.Create(customerCpf);
  }

  get subTotal(): number {
    return this._orderItems.reduce(
      (total, orderItem) => total + orderItem.total,
      0
    );
  }

  get total(): number {
    return this.subTotal - this.calculateCouponDiscountAmount();
  }

  get orderItems() {
    return this._orderItems;
  }

  public addItem(product: Product, quantity: number) {
    const orderItem = new OrderItem(product, quantity);
    this._orderItems.push(orderItem);
    return this;
  }

  public applyCoupon(input: {
    discountValue: number;
    discountType: DiscountType;
    code: string;
    expirationDate: Date;
  }) {
    const coupon = new Coupon({
      code: input.code,
      discountType: input.discountType,
      discountValue: input.discountValue,
      expirationDate: input.expirationDate,
    });

    if (coupon.isExpired()) {
      throw new Error("coupon expired.");
    } else {
      this.coupon = coupon;
    }
  }

  private calculateCouponDiscountAmount(): number {
    if (!this.coupon) {
      return 0;
    }

    const discountCalculator = DiscountCalculatorFactory.Create(
      this.coupon.discount
    );

    return discountCalculator.calculate(this.subTotal, this.coupon.discount);
  }
}
