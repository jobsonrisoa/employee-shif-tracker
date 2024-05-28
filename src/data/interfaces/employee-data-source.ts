import {
  EmployeeRequestModel,
  EmployeeResponseModel,
} from "../../domain/models/employee";

export interface EmployeeDataSource {
  findById(id: string): Promise<EmployeeResponseModel | null>;
  create(employee: EmployeeRequestModel): Promise<EmployeeResponseModel>;
}
