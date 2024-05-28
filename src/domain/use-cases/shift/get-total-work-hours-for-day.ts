import { ShiftRepository } from "../../interfaces/repositories/shift-repository";
import { GetTotalWorkHoursForDayUseCase } from "../../interfaces/use-cases/shift/get-total-work-hours-for-day";

export class GetTotalWorkHoursForDay implements GetTotalWorkHoursForDayUseCase {
  private shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(employeeId: string, date: Date): Promise<number> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const shifts = await this.shiftRepository.getWorkHours(employeeId, startOfDay, endOfDay);

    let totalHours = 0;

    shifts.forEach((shift) => {
      if (shift.endShift && shift.startShift) {
        const hours =
          (shift.endShift.getTime() - shift.startShift.getTime()) /
          (1000 * 60 * 60);
        totalHours += hours;
      }
    });

    return totalHours;
  }
}
