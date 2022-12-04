import { Uuid } from "~/shared/domain/Uuid";

export class ProductId {
  private _id: Uuid;

  private constructor(id: string) {
    this._id = Uuid.Create(id);
  }

  static Create(id: string) {
    return new ProductId(id);
  }

  get value() {
    return this._id.value;
  }
}
