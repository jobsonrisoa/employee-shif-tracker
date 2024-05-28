import { EmployeeDataSource } from "../../data/interfaces/employee-data-source";
import { EmployeeRepository } from "../interfaces/repositories/employee-repository";
import {
  EmployeeRequestModel,
  EmployeeResponseModel,
} from "../models/employee";

export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(private employeeDataSource: EmployeeDataSource) {}

  async create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel> {
    try {
      return await this.employeeDataSource.create(employee);
    } catch (error) {
      console.error("Error in EmployeeRepositoryImpl.create:", error);
      throw new Error("Error creating employee");
    }
  }

  async findById(id: string): Promise<EmployeeResponseModel | null> {
    try {
      return await this.employeeDataSource.findById(id);
    } catch (error) {
      console.error("Error in EmployeeRepositoryImpl.findById:", error);
      throw new Error("Error finding employee");
    }
  }
}
