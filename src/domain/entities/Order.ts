import { PercentageDiscountCalculator } from "../services/discount/PercentageDiscountCalculator";
import { Coupon } from "./Coupon";
import { OrderId } from "./value-objects/OrderId";
import { OrderItem as OrderItem } from "./OrderItem";
import { Cpf } from "./value-objects/Cpf";
import { OrderCode } from "./value-objects/OrderCode";
import { Sequence } from "./value-objects/Sequence";

export interface CreateOrderArgs {
  id?: OrderId;
  customerCpf: Cpf;
  orderSequence: Sequence;
}

export class Order {
  private _id: OrderId;
  private _customerCpf: Cpf;
  private coupon?: Coupon;
  private _orderItems: OrderItem[] = [];
  private _orderCode: OrderCode;

  constructor(args: CreateOrderArgs) {
    this._id = args.id ?? OrderId.Create();
    this._customerCpf = args.customerCpf;
    this._orderCode = OrderCode.Create(args.orderSequence);
  }

  get subTotal(): number {
    return this._orderItems.reduce(
      (total, orderItem) => total + orderItem.total,
      0
    );
  }

  get id(): OrderId {
    return this._id;
  }

  get customerCpf(): Cpf {
    return this._customerCpf;
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

    return new PercentageDiscountCalculator().calculate(
      this.subTotal,
      this.coupon.discount
    );
  }

  public addItem(orderItem: OrderItem) {
    if (this.hasAlreadyAdded(orderItem)) {
      throw new Error("Duplicated item.");
    }

    this._orderItems.push(orderItem);
    return this;
  }

  private hasAlreadyAdded(newOrderItem: OrderItem) {
    return this._orderItems.some((orderItem) =>
      orderItem.productId.equals(newOrderItem.productId)
    );
  }

  public applyCoupon(coupon: Coupon) {
    if (coupon.isExpired()) {
      throw new Error("Coupon expired");
    } else {
      this.coupon = coupon;
    }
  }
}
