import { injectable } from "inversify";
import { Ivalidation } from "../../interfaces/validation.interface";

@injectable()
export class CnpjValidationService implements Ivalidation {

  validate = (input: string): boolean => {
    const cnpj = input.replace(/\D/g, "");

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    const calcDigit = (base: string, weights: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += Number(base[i]) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    // primeiros 12 dígitos
    const base = cnpj.substring(0, 12);

    // pesos do primeiro dígito
    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const firstDigit = calcDigit(base, firstWeights);

    // pesos do segundo dígito
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondDigit = calcDigit(base + firstDigit, secondWeights);

    const dv = cnpj.substring(12, 14);

    return dv === `${firstDigit}${secondDigit}`;
  };
}
