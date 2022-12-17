import { Order } from "~/domain/entities/Order";
import { Sequence } from "~/domain/entities/value-objects/Sequence";
import { OrderRepository } from "~/domain/repositories/OrderRepository";

export class OrderInMemoryRepository implements OrderRepository {
  orders: Order[] = [];

  save(order: Order): Promise<void> {
    return new Promise((resolve) => {
      this.orders.push(order);
      resolve();
    });
  }

  getNextSequence(): Promise<Sequence> {
    return Promise.resolve(Sequence.Create(this.orders.length + 1));
  }
}
