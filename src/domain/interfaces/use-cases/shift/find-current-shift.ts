import { ShiftResponseModel } from "../../../models/shift";

export interface FindCurrentShiftUseCase {
  execute(employeeId: string): Promise<ShiftResponseModel | null>;
}
