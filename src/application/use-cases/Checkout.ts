import { Order } from "~/domain/entities/Order";
import { OrderItem } from "~/domain/entities/OrderItem";
import { ProductId } from "~/domain/entities/value-objects/ProductId";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { Cpf } from "~/domain/entities/value-objects/Cpf";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { CouponRepository } from "~/domain/repositories/CouponRepository";
import { OrderRepository } from "~/domain/repositories/OrderRepository";
import { ProductRepository } from "~/domain/repositories/ProductRepository";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export interface CheckoutInput {
  customerCpf: string;
  items: CheckoutItem[];
  couponCode?: string;
}

interface CheckoutOutput {
  orderCode: string;
  total: number;
}

export class Checkout {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private couponRepository: CouponRepository
  ) {}

  async execute({
    customerCpf,
    items,
    couponCode: rawCouponCode,
  }: CheckoutInput): Promise<CheckoutOutput> {
    const order = await this.createOrder(customerCpf);
    await this.addOrderItems(items, order);
    if (rawCouponCode) {
      await this.applyCoupon(CouponCode.Create(rawCouponCode), order);
    }
    await this.orderRepository.save(order);
    return {
      orderCode: order.orderCode.value,
      total: order.total,
    };
  }

  private async createOrder(customerCpf: string): Promise<Order> {
    const cpf = Cpf.Create(customerCpf);
    const nextSequence = await this.orderRepository.getNextSequence();
    return new Order({
      customerCpf: cpf,
      orderSequence: nextSequence,
    });
  }

  private async addOrderItems(
    checkoutItems: CheckoutItem[],
    order: Order
  ): Promise<void> {
    for (const checkoutItem of checkoutItems) {
      const productId = ProductId.Create(checkoutItem.productId);
      const product = await this.findProductById(productId);
      const orderItem = new OrderItem({
        price: product.price,
        quantity: Quantity.Create(checkoutItem.quantity),
        productId,
      });
      order.addItem(orderItem);
    }
  }

  private async findProductById(productId: ProductId) {
    const product = await this.productRepository.find(productId);

    if (!product) {
      throw new Error(`Product not found: ${productId.value}`);
    }

    return product;
  }

  private async applyCoupon(couponCode: CouponCode, order: Order) {
    const coupon = await this.couponRepository.find(couponCode);

    if (!coupon) {
      throw new Error(`Coupon not found: ${couponCode.value}`);
    }

    order.applyCoupon(coupon);
  }
}
