import { DateTool } from "~/shared/tools/DateTool";

describe("DateTools", () => {
  describe("addDaysTo", () => {
    test.each([
      ["2022-10-01", "2022-10-11", 10],
      ["2022-10-01", "2022-09-30", -1],
      ["2022-02-01", "2022-03-03", 30],
    ])(
      "Input %s => Expected: %s",
      (rawInputDate: string, rawExpectedDate: string, daysToAdd: number) => {
        const inputDate = new Date(rawInputDate);
        const expectedDate = new Date(rawExpectedDate);

        expect(DateTool.addDaysTo(inputDate, daysToAdd)).toStrictEqual(
          expectedDate
        );
      }
    );
  });
});
