import { Op } from "sequelize";
import { ShiftRequestModel, ShiftResponseModel } from "../../../domain/models/shift";
import { ShiftDataSource } from "../../interfaces/shift-data-source";
import { Shift } from "./models/shift";

export class SequelizeShiftDataSource implements ShiftDataSource {
  async findCurrentShift(employeeId: string): Promise<ShiftResponseModel | null> {
    const shift = await Shift.findOne({
      where: {
        employeeId,
        endShift: {
          [Op.is]: null,
        },
      },
    });

    if (!shift) return null;

    return this.toShiftResponseModel(shift);
  }

  async create(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    const createdShift = await Shift.create({
      startShift: shift.startShift,
      endShift: shift.endShift,
      employeeId: shift.employeeId,
    });

    return this.toShiftResponseModel(createdShift);
  }

  async endShift(shift: ShiftRequestModel): Promise<ShiftResponseModel> {
    const [affectedCount, [updatedShift]] = await Shift.update(
      { endShift: shift.endShift },
      { where: { id: shift.id }, returning: true }
    );

    if (affectedCount === 0 || !updatedShift) {
      throw new Error(`Shift with id ${shift.id} not found`);
    }

    return this.toShiftResponseModel(updatedShift);
  }

  async getWorkHours(employeeId: string, startDate: Date, endDate: Date): Promise<ShiftResponseModel[]> {
    console.log(`Fetching work hours for employeeId: ${employeeId}, startDate: ${startDate}, endDate: ${endDate}`);
    
    const shifts = await Shift.findAll({
      where: {
        employeeId,
        startShift: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    console.log(`Shifts found: ${shifts.length}`);
    shifts.forEach(shift => console.log(shift.toJSON()));

    return shifts.map(shift => ({
      id: shift.id,
      startShift: shift.startShift,
      endShift: shift.endShift,
      employeeId: shift.employeeId,
    }));
  }

  private toShiftResponseModel(shift: Shift): ShiftResponseModel {
    return {
      id: shift.id,
      startShift: shift.startShift,
      endShift: shift.endShift,
      employeeId: shift.employeeId,
    };
  }
}
