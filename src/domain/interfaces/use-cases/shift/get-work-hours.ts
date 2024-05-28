import { ShiftResponseModel } from "../../../models/shift";

export interface GetWorkHoursUseCase {
  execute(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]>;
}
