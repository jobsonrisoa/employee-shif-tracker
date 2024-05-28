import { EmployeeRequestModel } from "../../../models/employee";

export interface CreateEmployeeUseCase {
  execute(contact: EmployeeRequestModel): void;
}
