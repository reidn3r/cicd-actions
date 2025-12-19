import { injectable } from "inversify";
import { Ivalidation } from "../../interfaces/validation.interface";

@injectable()
export class CpfValidationService implements Ivalidation {

  validate = (input: string): boolean => {
    const cpf = input.replace(/\D/g, ""); 

    if (cpf.length !== 11) return false;

    // Rejeita sequências repetidas (ex: 00000000000)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcDigit = (base: string, factorStart: number): number => {
      let sum = 0;
      let factor = factorStart;

      for (const digit of base) {
        sum += Number(digit) * factor--;
      }

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    // primeiros 9 dígitos
    const base = cpf.substring(0, 9);

    const digit1 = calcDigit(base, 10);
    const digit2 = calcDigit(base + digit1, 11);

    const dv = cpf.substring(9, 11);

    return dv === `${digit1}${digit2}`;
  };
}
