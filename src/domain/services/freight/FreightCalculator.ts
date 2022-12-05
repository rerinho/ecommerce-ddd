import { Dimension } from "~/domain/entities/value-objects/Dimension";
import { Weight } from "~/domain/entities/value-objects/Weight";

export interface ShippingPackage {
  dimension: Dimension;
  weight: Weight;
}

export class FreightCalculator {
  private static DISTANCE = 1000;
  static readonly MIN_FREIGHT_VALUE = 10;

  static calculate(packages: ShippingPackage[]): number {
    return packages.reduce(
      (freightValue: number, shippingPackage: ShippingPackage) => {
        freightValue +=
          FreightCalculator.calculatePackageFreight(shippingPackage);

        return freightValue;
      },
      0
    );
  }

  private static calculatePackageFreight(
    shippingPackage: ShippingPackage
  ): number {
    const volumeInMeters = shippingPackage.dimension.volume * 0.000001;
    const density = FreightCalculator.calculateDensity(shippingPackage.weight, volumeInMeters);

    const freight =
      FreightCalculator.DISTANCE * volumeInMeters * (density / 100);

    return freight > 10 ? freight : FreightCalculator.MIN_FREIGHT_VALUE;
  }

  private static calculateDensity(weight: Weight, volume: number) {
    return weight.value / volume;
  }
}
