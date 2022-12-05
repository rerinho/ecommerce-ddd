import { generateProduct } from "@test/utils/entity-generator/ProductGenerator";
import { generateCpf } from "@test/utils/value-generator/CpfGenerator";
import { Cpf } from "~/domain/entities/value-objects/Cpf";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { DateTool } from "~/shared/tools/DateTool";
import { Order } from "../../../src/domain/entities/Order";
import { DiscountType } from "../../../src/domain/entities/value-objects/Discount";

// Constants
const VALID_CPF = generateCpf();
const INVALID_RAW_CPF = "111111111";
const VALID_COUPON_CODE = "COUPONCODE12";
const VALID_COUPON_EXPIRATION_DATE = DateTool.addDaysTo(new Date(), 10);

const PRODUCT = generateProduct({
  price: Price.Create(50),
});

describe("Order", () => {
  test("should not allow creating an order with an invalid consumer CPF", () => {
    expect(
      () => new Order({ customerCpf: Cpf.Create(INVALID_RAW_CPF) })
    ).toThrow(Error);
  });

  describe("addItem", () => {
    test("should add an item in the order", () => {
      const order = new Order({ customerCpf: VALID_CPF });

      order.addItem(PRODUCT, Quantity.Create(2));

      expect(order.orderItems).toHaveLength(1);
      expect(order.orderItems[0].quantity).toBe(2);
    });

    test("should not allow adding a duplicated item", () => {
      const order = new Order({ customerCpf: VALID_CPF });

      order.addItem(PRODUCT, Quantity.Create(1));

      expect(() => order.addItem(PRODUCT, Quantity.Create(1))).toThrow(
        Error("Duplicated item.")
      );
    });
  });

  describe("applyCoupon", () => {
    test("should not allow applying expired coupon", () => {
      const order = new Order({ customerCpf: VALID_CPF });

      expect(() =>
        order.applyCoupon({
          code: VALID_COUPON_CODE,
          discountType: DiscountType.Nominal,
          discountValue: 50,
          expirationDate: DateTool.addDaysTo(new Date(), -1),
        })
      ).toThrowError(Error("coupon expired."));
    });

    test("nominal discount ", () => {
      const order = new Order({ customerCpf: VALID_CPF }).addItem(
        PRODUCT,
        Quantity.Create(3)
      );
      order.applyCoupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Nominal,
        discountValue: 50,
        expirationDate: VALID_COUPON_EXPIRATION_DATE,
      });

      expect(order.total).toBe(100);
    });

    test("percentage discount ", () => {
      const order = new Order({ customerCpf: VALID_CPF }).addItem(
        PRODUCT,
        Quantity.Create(3)
      );
      order.applyCoupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Percentage,
        discountValue: 0.1,
        expirationDate: VALID_COUPON_EXPIRATION_DATE,
      });

      expect(order.total).toBe(135);
    });
  });

  describe("should create an order with 3 valid products", () => {
    test("without coupon application", () => {
      const order = new Order({ customerCpf: VALID_CPF }).addItem(
        PRODUCT,
        Quantity.Create(3)
      );

      expect(order.total).toBe(150);
    });

    test("subTotal should return the price without discounts", () => {
      const order = new Order({ customerCpf: VALID_CPF }).addItem(
        PRODUCT,
        Quantity.Create(3)
      );

      order.applyCoupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Nominal,
        discountValue: 50,
        expirationDate: VALID_COUPON_EXPIRATION_DATE,
      });

      expect(order.subTotal).toBe(150);
    });
  });
});
