import Product from "../entities/Product";
import { ProductId } from "../entities/value-objects/ProductId";

export interface ListProductOptions {
  productIds?: ProductId[];
}

export interface ProductRepository {
  save(product: Product): Promise<void>;
  find(productId: ProductId): Promise<Product | undefined>;
  list(options?: ListProductOptions): Promise<Product[]>;
}
