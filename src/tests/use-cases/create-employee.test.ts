import { EmployeeRepository } from "../../domain/interfaces/repositories/employee-repository";
import {
  EmployeeRequestModel,
  EmployeeResponseModel,
} from "../../domain/models/employee";
import { CreateEmployee } from "../../domain/use-cases/employee/create-employee";

class MockEmployeeRepository implements EmployeeRepository {
  private employees: EmployeeResponseModel[] = [];

  async create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel> {
    const newEmployee = {
      id: Math.random().toString(36).substring(2, 9),
      ...employee,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async findById(id: string): Promise<EmployeeResponseModel | null> {
    return this.employees.find((employee) => employee.id === id) || null;
  }
}

describe("CreateEmployee Use Case", () => {
  it("should create a new employee", async () => {
    const mockEmployeeRepository = new MockEmployeeRepository();
    const createEmployeeUseCase = new CreateEmployee(mockEmployeeRepository);

    const employeeRequest: EmployeeRequestModel = { name: "John Doe" };
    const newEmployee = await createEmployeeUseCase.execute(employeeRequest);

    expect(newEmployee).toHaveProperty("id");
    expect(newEmployee.name).toBe("John Doe");
  });
});
