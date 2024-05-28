import { ShiftRepository } from "../../interfaces/repositories/shift-repository";
import { FindCurrentShiftUseCase } from "../../interfaces/use-cases/shift/find-current-shift";
import { ShiftResponseModel } from "../../models/shift";

export class FindCurrentShift implements FindCurrentShiftUseCase {
  private shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(employeeId: string): Promise<ShiftResponseModel | null> {
    return this.shiftRepository.findCurrentShift(employeeId);
  }
}
