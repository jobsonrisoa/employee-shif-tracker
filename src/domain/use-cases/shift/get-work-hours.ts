import { ShiftRepository } from "../../interfaces/repositories/shift-repository";
import { GetWorkHoursUseCase } from "../../interfaces/use-cases/shift/get-work-hours";
import { ShiftResponseModel } from "../../models/shift";

export class GetWorkHours implements GetWorkHoursUseCase {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]> {
    return this.shiftRepository.getWorkHours(employeeId, startDate, endDate);
  }
}
