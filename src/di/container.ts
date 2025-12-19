import { Container } from "inversify";
import { CnpjValidationService } from "../services/cnpj/cnpj-validation.service";
import { CpfValidationService } from "../services/cpf/cpf.validation.service";
import { TYPES } from "./tokens";

const container = new Container();
container
  .bind<CnpjValidationService>(TYPES.CnpjValidationService)
  .to(CnpjValidationService)
  .inSingletonScope()

container
  .bind<CpfValidationService>(TYPES.CpfValidationService)
  .to(CpfValidationService)
  .inSingletonScope()

export { container };
