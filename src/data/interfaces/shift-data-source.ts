import { ShiftRequestModel, ShiftResponseModel } from "../../domain/models/shift";

export interface ShiftDataSource {
  findCurrentShift(employeeId: string): Promise<ShiftResponseModel | null>;
  create(shift: ShiftRequestModel): Promise<ShiftResponseModel>;
  endShift(shift: ShiftRequestModel): Promise<ShiftResponseModel>;
  getWorkHours(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]>;
}
