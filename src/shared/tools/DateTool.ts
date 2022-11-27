import { addDays } from "date-fns";

export class DateTool {
  static addDaysTo(date: Date, days: number) {
    return addDays(date, days);
  }
}
