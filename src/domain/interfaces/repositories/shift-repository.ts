import { ShiftRequestModel, ShiftResponseModel } from "../../models/shift";

export interface ShiftRepository {
  create(shift: ShiftRequestModel): Promise<ShiftResponseModel>;
  findCurrentShift(employeeId: string): Promise<ShiftResponseModel | null>;
  endShift(shift: ShiftRequestModel): Promise<ShiftResponseModel>;
  getWorkHours(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]>;
  getTotalWorkHoursForDay(employeeId: string, date: Date): Promise<number>;
  startShift(employeeId: string, startShift: Date): Promise<ShiftResponseModel>;
}
