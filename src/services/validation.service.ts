import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "../di/tokens";
import { Ivalidation } from "../interfaces/validation.interface";

@injectable()
export class ValidationServiceFacade {
  constructor(
    @inject(TYPES.CnpjValidationService)
    private cnpjService: Ivalidation,

    @inject(TYPES.CpfValidationService)
    private cpfService: Ivalidation
  ) {}

  validateCpf(cpf: string): boolean {
    return this.cpfService.validate(cpf)
  }
  
  validateCnpj(cnpj: string): boolean {
    return this.cnpjService.validate(cnpj)
  }

}