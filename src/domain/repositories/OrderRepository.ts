import { Order } from "../entities/Order";
import { SequenceGenerator } from "../services/SequenceGenerator";

export interface OrderRepository extends SequenceGenerator {
  save(order: Order): Promise<void>;
}
