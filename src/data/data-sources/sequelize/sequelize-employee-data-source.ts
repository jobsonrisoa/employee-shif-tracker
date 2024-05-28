import {
  EmployeeRequestModel,
  EmployeeResponseModel,
} from "../../../domain/models/employee";
import { EmployeeDataSource } from "../../interfaces/employee-data-source";
import { Employee as EmployeeModel } from "./models/employee";

export class SequelizeEmployeeDataSource implements EmployeeDataSource {
  async findById(id: string): Promise<EmployeeResponseModel | null> {
    const employee = await EmployeeModel.findByPk(id);
    if (!employee) return null;
    return { id: employee.id, name: employee.name };
  }

  async create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel> {
    const createdEmployee = await EmployeeModel.create({
      name: employee.name,
    });
    return { id: createdEmployee.id, name: createdEmployee.name };
  }
}
