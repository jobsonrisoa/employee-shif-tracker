import { ShiftRepository } from "../../interfaces/repositories/shift-repository";
import { EndShiftUseCase } from "../../interfaces/use-cases/shift/end-shift";
import { ShiftRequestModel, ShiftResponseModel } from "../../models/shift";

export class EndShift implements EndShiftUseCase {
  private shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    return this.shiftRepository.endShift(shift);
  }
}
