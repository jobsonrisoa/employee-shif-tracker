import { EmployeeRepository } from "../../domain/interfaces/repositories/employee-repository";
import { EmployeeRequestModel, EmployeeResponseModel } from "../../domain/models/employee";


class MockEmployeeRepository implements EmployeeRepository {
  private employees: EmployeeResponseModel[] = [];

  async create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel> {
    const newEmployee = { id: Math.random().toString(36).substring(2, 9), ...employee };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async findById(id: string): Promise<EmployeeResponseModel | null> {
    return this.employees.find(employee => employee.id === id) || null;
  }
}

export { MockEmployeeRepository };
