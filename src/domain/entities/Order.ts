import { DiscountCalculatorFactory } from "../services/discount/DiscountCalculatorFactory";
import { Coupon } from "./Coupon";
import { OrderItem as OrderItem } from "./OrderItem";
import Product from "./Product";
import { Cpf } from "./value-objects/Cpf";
import { OrderCode } from "./value-objects/OrderCode";
import { Quantity } from "./value-objects/Quantity";
import { Sequence } from "./value-objects/Sequence";

export interface CreateOrderArgs {
  customerCpf: Cpf;
  orderSequence: Sequence;
}

export class Order {
  private customerCpf: Cpf;
  private coupon?: Coupon;
  private _orderItems: OrderItem[] = [];
  private _orderCode: OrderCode;

  constructor(options: CreateOrderArgs) {
    this.customerCpf = options.customerCpf;
    this._orderCode = OrderCode.Create(options.orderSequence);
  }

  get subTotal(): number {
    return this._orderItems.reduce(
      (total, orderItem) => total + orderItem.total,
      0
    );
  }

  get orderItems() {
    return this._orderItems;
  }

  get orderCode(): OrderCode {
    return this._orderCode;
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

  public applyCoupon(coupon: Coupon) {
    if (coupon.isExpired()) {
      throw new Error("coupon expired.");
    } else {
      this.coupon = coupon;
    }
  }
}
