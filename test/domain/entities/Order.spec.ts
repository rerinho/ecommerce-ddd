import { makeCoupon } from "@test/utils/factories/entity-factory/CouponFactory";
import {
  makeOrder,
  VALID_CREATE_ORDER_ARGS,
} from "@test/utils/factories/entity-factory/OrderFactory";
import { makeOrderItem } from "@test/utils/factories/entity-factory/OrderItemFactory";
import { makeCpf } from "@test/utils/factories/value-object-factory/CpfFactory";
import { Cpf } from "~/domain/entities/value-objects/Cpf";
import { Price } from "~/domain/entities/value-objects/Price";
import { Quantity } from "~/domain/entities/value-objects/Quantity";
import { Sequence } from "~/domain/entities/value-objects/Sequence";
import { DateTool } from "~/shared/tools/DateTool";
import { Order } from "../../../src/domain/entities/Order";
import {
  Discount,
  DiscountType,
} from "../../../src/domain/entities/value-objects/Discount";

// Constants
const VALID_CPF = makeCpf();
const INVALID_RAW_CPF = "111111111";

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
      const orderItem = makeOrderItem({
        price: Price.Create(50),
        quantity: Quantity.Create(2),
      });

      order.addItem(orderItem);

      expect(order.orderItems).toHaveLength(1);
      expect(order.orderItems[0].quantity).toBe(2);
    });

    test("should not allow adding a duplicated item", () => {
      const order = new Order({
        ...VALID_CREATE_ORDER_ARGS,
        customerCpf: VALID_CPF,
      });
      const orderItem = makeOrderItem({
        price: Price.Create(50),
        quantity: Quantity.Create(1),
      });

      order.addItem(orderItem);

      expect(() => order.addItem(orderItem)).toThrow(Error("Duplicated item."));
    });
  });

  describe("applyCoupon", () => {
    test("should not allow applying expired coupon", () => {
      const order = makeOrder();

      const expiredCoupon = makeCoupon({
        expirationDate: DateTool.addDaysTo(new Date(), -1),
      });

      expect(() => order.applyCoupon(expiredCoupon)).toThrowError(
        Error("coupon expired.")
      );
    });

    test("nominal discount ", () => {
      const order = makeOrder();
      const orderItem = makeOrderItem({
        price: Price.Create(50),
        quantity: Quantity.Create(3),
      });
      order.addItem(orderItem);

      const coupon = makeCoupon({
        discount: Discount.Create({
          type: DiscountType.Nominal,
          value: 50,
        }),
      });

      order.applyCoupon(coupon);

      expect(order.total).toBe(100);
    });

    test("percentage discount ", () => {
      const order = makeOrder();
      const orderItem = makeOrderItem({
        price: Price.Create(50),
        quantity: Quantity.Create(3),
      });
      order.addItem(orderItem);

      const coupon = makeCoupon({
        discount: Discount.Create({
          type: DiscountType.Percentage,
          value: 0.1,
        }),
      });

      order.applyCoupon(coupon);

      expect(order.total).toBe(135);
    });
  });

  describe("subtotal", () => {
    test("should return the price without discounts", () => {
      const order = makeOrder();
      const orderItem = makeOrderItem({
        quantity: Quantity.Create(3),
      });
      order.addItem(orderItem);

      const coupon = makeCoupon({
        discount: Discount.Create({
          type: DiscountType.Nominal,
          value: 50,
        }),
      });

      order.applyCoupon(coupon);

      expect(order.subTotal).toBe(150);
    });
  });
});
