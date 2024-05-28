import { ShiftDataSource } from "../../data/interfaces/shift-data-source";
import { ShiftRepository } from "../interfaces/repositories/shift-repository";
import { ShiftRequestModel, ShiftResponseModel } from "../models/shift";

export class ShiftRepositoryImpl implements ShiftRepository {
  private shiftDataSource: ShiftDataSource;

  constructor(shiftDataSource: ShiftDataSource) {
    this.shiftDataSource = shiftDataSource;
  }

  async findCurrentShift(
    employeeId: string
  ): Promise<ShiftResponseModel | null> {
    return this.shiftDataSource.findCurrentShift(employeeId);
  }

  async startShift(
    employeeId: string,
    startShift: Date
  ): Promise<ShiftResponseModel> {
    const newShift: ShiftRequestModel = {
      id: 0, // Sequelize will auto-increment this
      startShift,
      endShift: null,
      employeeId,
    };
    return this.shiftDataSource.create(newShift);
  }

  async create(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    return this.shiftDataSource.create(shift);
  }

  async endShift(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    return this.shiftDataSource.endShift(shift);
  }

  async getWorkHours(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ShiftResponseModel[]> {
    return this.shiftDataSource.getWorkHours(employeeId, startDate, endDate);
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
