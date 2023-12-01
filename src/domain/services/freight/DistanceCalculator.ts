import { Coordinate } from "~/domain/entities/value-objects/Coordinate";

export default class DistanceCalculator {
  static calculate(from: Coordinate, to: Coordinate) {
    if (from.latitude == to.latitude && from.longitude == to.longitude) {
      return 0;
    }
    const distance = this.calculateDistanceBetweenCoordinates(from, to);
    return this.convertToKilometers(distance);
  }

  private static calculateDistanceBetweenCoordinates(
    from: Coordinate,
    to: Coordinate
  ): number {
    const fromLatitudeRadius = this.calculateLatitudeRadius(from.latitude);
    const toLatitudeRadius = this.calculateLatitudeRadius(to.latitude);
    const theta = from.longitude - to.longitude;
    const radtheta = (Math.PI * theta) / 180;

    let distance =
      Math.sin(fromLatitudeRadius) * Math.sin(toLatitudeRadius) +
      Math.cos(fromLatitudeRadius) *
        Math.cos(toLatitudeRadius) *
        Math.cos(radtheta);

    if (distance > 1) {
      distance = 1;
    }

    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515;

    return distance;
  }

  private static calculateLatitudeRadius(latitude: number) {
    return (Math.PI * latitude) / 180;
  }

  private static convertToKilometers(distanceInMiles: number) {
    return distanceInMiles * 1.609344;
  }
}
