import { ValidationServiceFacade } from "./validation.service";

describe("ValidationServiceFacade", () => {
  it("deve validar CPF usando o mock", () => {
    const cpfMock = { validate: jest.fn().mockReturnValue(true) };
    const cnpjMock = { validate: jest.fn() };

    const facade = new ValidationServiceFacade(cnpjMock, cpfMock);

    const result = facade.validateCpf("123");
    
    expect(result).toBe(false); //teste nao passa propositalmente
    expect(cpfMock.validate).toHaveBeenCalledWith("123");
  });

  it("deve validar CNPJ usando o mock", () => {
    const cpfMock = { validate: jest.fn() };
    const cnpjMock = { validate: jest.fn().mockReturnValue(false) };

    const facade = new ValidationServiceFacade(cnpjMock, cpfMock);

    const result = facade.validateCnpj("999");

    expect(result).toBe(false);
    expect(cnpjMock.validate).toHaveBeenCalledWith("999");
  });
});
