import { DiscountCalculatorFactory } from "../services/discount/DiscountCalculatorFactory";
import { Coupon } from "./Coupon";
import { OrderItem as OrderItem } from "./OrderItem";
import Product from "./Product";
import { Cpf } from "./value-objects/Cpf";
import { DiscountType } from "./value-objects/Discount";
import { Quantity } from "./value-objects/Quantity";

interface CreateOrderOptions {
  customerCpf: Cpf;
}

export class Order {
  private customerCpf: Cpf;
  private coupon?: Coupon;
  private _orderItems: OrderItem[] = [];

  constructor(options: CreateOrderOptions) {
    this.customerCpf = options.customerCpf;
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

  private calculateCouponDiscountAmount(): number {
    if (!this.coupon) {
      return 0;
    }

    const discountCalculator = DiscountCalculatorFactory.Create(
      this.coupon.discount
    );

    return discountCalculator.calculate(this.subTotal, this.coupon.discount);
  }

  get orderItems() {
    return this._orderItems;
  }

  public addItem(product: Product, quantity: Quantity) {
    if (this.hasAlreadyAdded(product)) {
      throw new Error("Duplicated item.");
    }

    const orderItem = new OrderItem({
      price: product.price,
      productId: product.id,
      quantity,
    });
    this._orderItems.push(orderItem);
    return this;
  }

  private hasAlreadyAdded(product: Product) {
    return this._orderItems.some(
      (orderItem) => orderItem.productId === product.id
    );
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
}
