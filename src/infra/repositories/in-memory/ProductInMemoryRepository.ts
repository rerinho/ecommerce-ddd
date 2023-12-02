import Product from "~/domain/entities/Product";
import { ProductId } from "~/domain/entities/value-objects/ProductId";
import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Price } from "~/domain/entities/value-objects/Price";
import { ProductDescription } from "~/domain/entities/value-objects/ProductDescription";
import { Weight } from "~/domain/entities/value-objects/Weight";

import {
  ListProductOptions,
  ProductRepository,
} from "~/domain/repositories/ProductRepository";
import { products as persistedProducts } from "~/infra/database/database.json";

interface DatabaseProduct {
  id: string;
  description: string;
  price: number;
  height_in_meters: number;
  length_in_meters: number;
  width_in_meters: number;
  weight: number;
}

export class ProductInMemoryRepository implements ProductRepository {
  products: Product[] = [];

  constructor() {
    this.loadPersistedProducts();
  }

  private loadPersistedProducts() {
    persistedProducts.forEach((databaseProduct) => {
      const product = this.toDomain(databaseProduct);
      this.products.push(product);
    });
  }

  save(product: Product): Promise<void> {
    return new Promise((resolve) => {
      this.products.push(product);
      resolve();
    });
  }

  find(productId: ProductId): Promise<Product | undefined> {
    return Promise.resolve(
      this.products.find((product: Product) => product.id.equals(productId))
    );
  }

  list({ productIds }: ListProductOptions = {}): Promise<Product[]> {
    if (productIds?.length) {
      return Promise.resolve(this.listFilteringByProductIds(productIds));
    }

    return Promise.resolve(this.products);
  }

  private listFilteringByProductIds(productIds: ProductId[]): Product[] {
    return this.products.filter((product: Product) =>
      productIds.some((productId) => product.id.equals(productId))
    );
  }

  private toDomain(databaseProduct: DatabaseProduct) {
    return new Product({
      id: ProductId.Create(databaseProduct.id),
      description: ProductDescription.Create(databaseProduct.description),
      dimension: Dimension.Create({
        heightInMeters: databaseProduct.height_in_meters,
        lengthInMeters: databaseProduct.length_in_meters,
        widthInMeters: databaseProduct.width_in_meters,
      }),
      weight: Weight.Create(databaseProduct.weight),
      price: Price.Create(databaseProduct.price),
    });
  }
}
