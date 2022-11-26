import { Cpf } from "../../../../src/domain/entities/value-objects/Cpf";

// Constants

const INVALID_CPFS = [
  "586.077.650-01",
  "312.735.710-97",
  "714.396.940-02",
  "243.480.050-53",
  "243.480.050-5",
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
  "555.555.555-55",
  "666.666.666-66",
  "777.777.777-77",
  "888.888.888-88",
  "999.999.999-99",
  "000.000.000-00",
];

const VALID_CPFS = [
  "586.077.650-00",
  "312.735.710-96",
  "714.396.940-01",
  "243.480.050-52",
  "58607765000",
  "31273571096",
  "71439694001",
  "24348005052",
];

const EXPECTED_FAIL_MESSAGE = "cpf its not a valid CPF.";

describe("Cpf", () => {
  describe("should throw error when the entered CPF is invalid", () => {
    test.each(INVALID_CPFS)("%s", (rawCpf: string) => {
      expect(() => Cpf.Create(rawCpf)).toThrow(Error(EXPECTED_FAIL_MESSAGE));
    });
  });

  describe("should create a CPF instance when a valid cpf is entered", () => {
    test.each(VALID_CPFS)("%s", (rawCpf: string) => {
      const cpf = Cpf.Create(rawCpf);

      expect(cpf.value).toBe(rawCpf.replace(/\D/g, ""));
    });
  });
});
