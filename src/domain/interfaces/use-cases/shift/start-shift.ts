import { ShiftResponseModel } from "../../../models/shift";

export interface StartShiftUseCase {
  execute(employeeId: string, startShift: Date): Promise<ShiftResponseModel>;
}
