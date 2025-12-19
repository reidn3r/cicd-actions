import { FastifyInstance } from "fastify";
import { container } from "../di/container";
import { TYPES } from "../di/tokens";
import { ValidationServiceFacade } from "../services/validation.service";

export async function ValidationController(app: FastifyInstance) {
  
  const validationService = container.get<ValidationServiceFacade>(TYPES.ValidationServiceFacade)

  app.get("/cnpj/:cnpj", (request, reply) => {
    const { cnpj } = request.params as any;
    const isValid = validationService.validateCnpj(cnpj);
    
    return reply.status(200).send({ isValid, timeStamp: Date.now() })
    
  });
  
  app.get("/cpf/:cpf", (request, reply) => {
    const { cpf } = request.params as any;
    const isValid = validationService.validateCpf(cpf);
    
    return reply.status(200).send({ isValid, timeStamp: Date.now() })
  });
  
}