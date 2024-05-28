import { EmployeeRequestModel } from "../../domain/models/employee";
import { GetEmployee } from "../../domain/use-cases/employee/get-employee";
import { MockEmployeeRepository } from "../mocks/mock-employee-repository";

describe("GetEmployee Use Case", () => {
  it("should get an employee by id", async () => {
    const mockEmployeeRepository = new MockEmployeeRepository();
    const getEmployeeUseCase = new GetEmployee(mockEmployeeRepository);

    // Create a new employee
    const employeeRequest: EmployeeRequestModel = { name: "John Doe" };
    const createdEmployee = await mockEmployeeRepository.create(
      employeeRequest
    );

    // Retrieve the employee by id
    const retrievedEmployee = await getEmployeeUseCase.execute(
      createdEmployee.id
    );

    expect(retrievedEmployee).toEqual(createdEmployee);
  });

  it("should return null if employee is not found", async () => {
    const mockEmployeeRepository = new MockEmployeeRepository();
    const getEmployeeUseCase = new GetEmployee(mockEmployeeRepository);

    // Try to retrieve a non-existent employee
    const retrievedEmployee = await getEmployeeUseCase.execute("nonExistentId");

    expect(retrievedEmployee).toBeNull();
  });
});
