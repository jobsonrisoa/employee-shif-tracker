import { EmployeeResponseModel } from "../../../models/employee";

export interface GetEmployeeUseCase {
  execute(id: string): Promise<EmployeeResponseModel | null>;
}
