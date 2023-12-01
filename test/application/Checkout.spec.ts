import { makeCoupon } from "@test/utils/factories/entity-factory/CouponFactory";
import { makeProduct } from "@test/utils/factories/entity-factory/ProductFactory";
import { makeCpf } from "@test/utils/factories/value-object-factory/CpfFactory";
import { Checkout, CheckoutInput } from "~/application/use-cases/Checkout";
import { CouponCode } from "~/domain/entities/value-objects/CouponCode";
import { Cpf } from "~/domain/entities/value-objects/Cpf";
import {
  Discount,
  DiscountType,
} from "~/domain/entities/value-objects/Discount";
import { Price } from "~/domain/entities/value-objects/Price";
import { ProductRepository } from "~/domain/repositories/ProductRepository";
import { CouponInMemoryRepository } from "~/infra/repositories/in-memory/CouponInMemoryRepository";
import { OrderInMemoryRepository } from "~/infra/repositories/in-memory/OrderInMemoryRepository";
import { ProductInMemoryRepository } from "~/infra/repositories/in-memory/ProductInMemoryRepository";
import { DateTool } from "~/common/tools/DateTool";
import { UuidTool } from "~/common/tools/UuidTool";

// Constants
const cpf: Cpf = makeCpf();
const productA = makeProduct({
  price: Price.Create(50),
});
const productB = makeProduct({
  price: Price.Create(100),
});

describe("Checkout", () => {
  let checkout: Checkout;
  const productRepository = new ProductInMemoryRepository();
  const couponRepository = new CouponInMemoryRepository();
  const orderRepository = new OrderInMemoryRepository();

  beforeAll(async () => {
    checkout = new Checkout(
      productRepository,
      orderRepository,
      couponRepository
    );

    await setupProducts(productRepository);

    jest.useFakeTimers().setSystemTime(new Date("2021-01-01T03:00:00"));
  });

  afterAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  describe("checkout success", () => {
    test("should return orderCode and total", async () => {
      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: productA.id.value,
            quantity: 1,
          },
        ],
      };

      const output = await checkout.execute(input);

      expect(output).toMatchObject({
        total: productA.price.value,
        orderCode: "202100000001",
      });
    });

    test("should calculate total when more than one item is entered", async () => {
      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: productA.id.value,
            quantity: 1,
          },
          {
            productId: productB.id.value,
            quantity: 1,
          },
        ],
      };

      const output = await checkout.execute(input);

      expect(output).toEqual(
        expect.objectContaining({
          total: 150,
        })
      );
    });

    describe("when a valid coupon code is entered", () => {
      test("should apply the coupon discount", async () => {
        const coupon = makeCoupon({
          discount: Discount.Create({
            type: DiscountType.Nominal,
            value: 50,
          }),
          code: CouponCode.Create("GET30OFF"),
        });
        await couponRepository.save(coupon);
        const input: CheckoutInput = {
          customerCpf: cpf.value,
          items: [
            {
              productId: productA.id.value,
              quantity: 1,
            },
            {
              productId: productB.id.value,
              quantity: 3,
            },
          ],
          couponCode: coupon.code.value,
        };

        const output = await checkout.execute(input);

        expect(output).toEqual(
          expect.objectContaining({
            total: 300,
          })
        );
      });
    });

    test("should save the order", async () => {
      const orderRepositorySaveSpy = jest.spyOn(orderRepository, "save");
      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: productA.id.value,
            quantity: 1,
          },
        ],
      };

      await checkout.execute(input);

      expect(orderRepositorySaveSpy).toBeCalledTimes(1);
      orderRepositorySaveSpy.mockClear();
    });
  });

  describe("should throw an exception", () => {
    test("when a nonexistent productId is entered", async () => {
      const invalidProductId = UuidTool.generate();
      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: invalidProductId,
            quantity: 1,
          },
        ],
      };

      expect(() => checkout.execute(input)).rejects.toThrowError(
        Error(`Product not found: ${invalidProductId}`)
      );
    });

    test("when a nonexistent couponCode is entered", async () => {
      const invalidCouponCode = "GET220OFF";
      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: productA.id.value,
            quantity: 1,
          },
        ],
        couponCode: invalidCouponCode,
      };

      expect(() => checkout.execute(input)).rejects.toThrowError(
        Error(`Coupon not found: ${invalidCouponCode}`)
      );
    });

    test("when a expired couponCode is entered", async () => {
      const expiredCoupon = makeCoupon({
        expirationDate: DateTool.addDaysTo(new Date(), -5),
      });
      await couponRepository.save(expiredCoupon);

      const input: CheckoutInput = {
        customerCpf: cpf.value,
        items: [
          {
            productId: productA.id.value,
            quantity: 1,
          },
        ],
        couponCode: expiredCoupon.code.value,
      };

      expect(() => checkout.execute(input)).rejects.toThrowError(
        Error(`Coupon expired`)
      );
    });
  });
});

// Setup
async function setupProducts(productRepository: ProductRepository) {
  await Promise.all([
    productRepository.save(productA),
    productRepository.save(productB),
  ]);
}
