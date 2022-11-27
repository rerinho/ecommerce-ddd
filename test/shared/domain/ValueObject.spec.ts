import { ValueObject } from "~/shared/domain/ValueObject";

class MockValueObject extends ValueObject<{ value?: string }> {
  static Create(value: string) {
    return new MockValueObject({ value });
  }
}

describe("ValueObject", () => {
  test("should generate a new ValueObject instance", () => {
    const valueObject = MockValueObject.Create("value");

    expect(valueObject).toBeInstanceOf(ValueObject);
  });

  test("should not allow update the value of the properties", () => {
    const valueObject = MockValueObject.Create("value");

    expect(() => (valueObject["props"].value = "new value")).toThrowError(
      `Cannot assign to read only property 'value' of object '#<Object>`
    );
  });
  describe("equals", () => {
    test("should return true when the entered value object has the same properties values", () => {
      const valueObject = MockValueObject.Create("value");
      const anotherValueObject = MockValueObject.Create("value");

      expect(valueObject.equals(anotherValueObject)).toBe(true);
    });

    describe("should return false ", () => {
      test.each([null, undefined])(
        "when the props is %s",
        (propsValue: any) => {
          const valueObject = MockValueObject.Create("value");
          const anotherValueObject = MockValueObject.Create(propsValue);

          expect(valueObject.equals(anotherValueObject)).toBe(false);
        }
      );

      test.each([null, undefined])(
        "when the entered value object is %s",
        (valueObjectInstance: any) => {
          const valueObject = MockValueObject.Create("value");

          expect(valueObject.equals(valueObjectInstance)).toBe(false);
        }
      );
      test("when all props have different values", () => {
        const valueObject = MockValueObject.Create("value");
        const anotherValueObject = MockValueObject.Create("anotherValue");

        expect(valueObject.equals(anotherValueObject)).toBe(false);
      });

      test("when the object value properties have different values", () => {
        const valueObject = MockValueObject.Create("value");
        const anotherValueObject = MockValueObject.Create("anotherValue");

        expect(valueObject.equals(anotherValueObject)).toBe(false);
      });

      test("when the object value properties have different values", () => {
        const valueObject = MockValueObject.Create("value");
        const anotherValueObject = MockValueObject.Create("anotherValue");

        expect(valueObject.equals(anotherValueObject)).toBe(false);
      });
    });
  });
});
