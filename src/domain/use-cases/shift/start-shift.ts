import { ShiftRepository } from "../../interfaces/repositories/shift-repository";
import { StartShiftUseCase } from "../../interfaces/use-cases/shift/start-shift";
import { ShiftResponseModel } from "../../models/shift";

export class StartShift implements StartShiftUseCase {
  private shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(employeeId: string, startShift: Date): Promise<ShiftResponseModel> {
    const newShift = {
      id: 0,
      startShift,
      endShift: null,
      employeeId,
    };
    return this.shiftRepository.create(newShift);
  }
}
