import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "../di/tokens";
import { CnpjValidationService } from "./cnpj/cnpj-validation.service";
import { CpfValidationService } from "./cpf/cpf.validation.service";

@injectable()
export class ValidationServiceFacade {
  constructor(
    @inject(TYPES.CnpjValidationService)
    private cnpjService: CnpjValidationService,

    @inject(TYPES.CpfValidationService)
    private cpfService: CpfValidationService
  ) {}

  validateCpf(cpf: string): boolean {
    return this.cpfService.validate(cpf)
  }
  
  validateCnpj(cnpj: string): boolean {
    return this.cnpjService.validate(cnpj)
  }

}