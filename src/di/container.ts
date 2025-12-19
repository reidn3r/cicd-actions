import { Container } from "inversify";
import { CnpjValidationService } from "../services/cnpj/cnpj-validation.service";
import { CpfValidationService } from "../services/cpf/cpf.validation.service";
import { TYPES } from "./tokens";
import { ValidationServiceFacade } from "../services/validation.service";

const container = new Container();
container
  .bind<CnpjValidationService>(TYPES.CnpjValidationService)
  .to(CnpjValidationService)
  .inSingletonScope()

container
  .bind<CpfValidationService>(TYPES.CpfValidationService)
  .to(CpfValidationService)
  .inSingletonScope()

  container
  .bind<ValidationServiceFacade>(TYPES.ValidationServiceFacade)
  .to(ValidationServiceFacade)
  .inSingletonScope()

export { container };
