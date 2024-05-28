import { ShiftRepository } from "../../domain/interfaces/repositories/shift-repository";
import {
  ShiftRequestModel,
  ShiftResponseModel,
} from "../../domain/models/shift";

class MockShiftRepository implements ShiftRepository {
  private shifts: ShiftResponseModel[] = [];
  private currentId = 1;

  async create(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    const newShift = { ...shift, id: this.currentId++ };
    this.shifts.push(newShift);
    return newShift;
  }

  async findCurrentShift(
    employeeId: string
  ): Promise<ShiftResponseModel | null> {
    return (
      this.shifts.find(
        (shift) => shift.employeeId === employeeId && !shift.endShift
      ) || null
    );
  }

  async endShift(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    const currentShift = await this.findCurrentShift(shift.employeeId);
    if (currentShift) {
      currentShift.endShift = shift.endShift;
      return currentShift;
    }
    throw new Error("Shift not found");
  }

  async getWorkHours(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]> {
    return this.shifts.filter(
      (shift) =>
        shift.employeeId === employeeId &&
        shift.startShift >= startDate &&
        shift.endShift !== null &&
        shift.endShift <= endDate
    );
  }

  async getTotalWorkHoursForDay(
    employeeId: string,
    date: Date
  ): Promise<number> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const shifts = await this.getWorkHours(employeeId, startOfDay, endOfDay);
    return shifts.reduce((total, shift) => {
      if (shift.endShift) {
        return (
          total +
          (shift.endShift.getTime() - shift.startShift.getTime()) /
            (1000 * 60 * 60)
        );
      }
      return total;
    }, 0);
  }

  async startShift(
    employeeId: string,
    startShift: Date
  ): Promise<ShiftResponseModel> {
    const newShift: ShiftRequestModel = {
      id: 0,
      startShift,
      endShift: null,
      employeeId,
    };
    return this.create(newShift);
  }
}

export { MockShiftRepository };
