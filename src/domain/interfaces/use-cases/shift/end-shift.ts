import { ShiftRequestModel, ShiftResponseModel } from "../../../models/shift";

export interface EndShiftUseCase {
  execute(shift: ShiftRequestModel): Promise<ShiftResponseModel>;
}
