import { EmployeeRepository } from "../../interfaces/repositories/employee-repository";
import { CreateEmployeeUseCase } from "../../interfaces/use-cases/employee/create-employee";
import {
  EmployeeRequestModel,
  EmployeeResponseModel,
} from "../../models/employee";

export class CreateEmployee implements CreateEmployeeUseCase {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(
    employee: EmployeeRequestModel
  ): Promise<EmployeeResponseModel> {
    return this.employeeRepository.create(employee);
  }
}
