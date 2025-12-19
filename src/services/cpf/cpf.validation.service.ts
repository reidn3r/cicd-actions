import { injectable } from "inversify";
import { Ivalidation } from "../validation.interface";

@injectable()
export class CpfValidationService implements Ivalidation {
  validate = (input: string) => {
    return false
  };
}