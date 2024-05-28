import { EmployeeRepository } from "../../interfaces/repositories/employee-repository";
import { GetEmployeeUseCase } from "../../interfaces/use-cases/employee/get-employee";
import { EmployeeResponseModel } from "../../models/employee";

export class GetEmployee implements GetEmployeeUseCase {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id: string): Promise<EmployeeResponseModel | null> {
    const result = await this.employeeRepository.findById(id);
    return result;
  }
}
