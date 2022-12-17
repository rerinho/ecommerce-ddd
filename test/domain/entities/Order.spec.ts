import { VALID_CREATE_ORDER_ARGS } from "@test/utils/factories/entity-factory/OrderFactory";
import { makeProduct } from "@test/utils/factories/entity-factory/ProductFactory";
import { makeCpf } from "@test/utils/factories/value-object-factory/CpfFactory";
import { Cpf } from "~/domain/entities/value-objects/Cpf";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { Sequence } from "~/domain/entities/value-objects/Sequence";
import { DateTool } from "~/shared/tools/DateTool";
import { Order } from "../../../src/domain/entities/Order";
import { DiscountType } from "../../../src/domain/entities/value-objects/Discount";

// Constants
const VALID_CPF = makeCpf();
const INVALID_RAW_CPF = "111111111";
const VALID_COUPON_CODE = "COUPONCODE12";
const VALID_COUPON_EXPIRATION_DATE = DateTool.addDaysTo(new Date(), 10);

const PRODUCT = makeProduct({
  price: Price.Create(50),
});

describe("Order", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2021-01-01T03:00:00"));
  });

  afterAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  describe("order instantiation", () => {
    describe("should not allow creating an order", () => {
      test("with an invalid consumer CPF", () => {
        expect(
          () =>
            new Order({
              ...VALID_CREATE_ORDER_ARGS,
              customerCpf: Cpf.Create(INVALID_RAW_CPF),
            })
        ).toThrow(Error);
      });

      test("with an invalid orderSequence", () => {
        expect(
          () =>
            new Order({
              ...VALID_CREATE_ORDER_ARGS,
              orderSequence: Sequence.Create(0),
            })
        ).toThrow(Error);
      });
    });

    test("should set a order code based on the entered orderSequence", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        orderSequence: Sequence.Create(1),
      });

      expect(order.orderCode.value).toBe("202100000001");
    });
  });

  describe("addItem", () => {
    test("should add an item in the order", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      });

      order.addItem(PRODUCT, Quantity.Create(2));

      expect(order.orderItems).toHaveLength(1);
      expect(order.orderItems[0].quantity).toBe(2);
    });

    test("should not allow adding a duplicated item", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      });

      order.addItem(PRODUCT, Quantity.Create(1));

      expect(() => order.addItem(PRODUCT, Quantity.Create(1))).toThrow(
        Error("Duplicated item.")
      );
    });
  });

  describe("applyCoupon", () => {
    test("should not allow applying expired coupon", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      });

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
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      }).addItem(PRODUCT, Quantity.Create(3));
      order.applyCoupon({
        code: VALID_COUPON_CODE,
        discountType: DiscountType.Nominal,
        discountValue: 50,
        expirationDate: VALID_COUPON_EXPIRATION_DATE,
      });

      expect(order.total).toBe(100);
    });

    test("percentage discount ", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      }).addItem(PRODUCT, Quantity.Create(3));
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
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      }).addItem(PRODUCT, Quantity.Create(3));

      expect(order.total).toBe(150);
    });

    test("subTotal should return the price without discounts", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      }).addItem(PRODUCT, Quantity.Create(3));

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
