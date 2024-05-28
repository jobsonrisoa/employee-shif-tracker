import { EmployeeRequestModel, EmployeeResponseModel } from "../../models/employee";

export interface EmployeeRepository {
  create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel>;
  findById(id: string): Promise<EmployeeResponseModel | null>;
}
