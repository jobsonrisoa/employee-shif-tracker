import { GetTotalWorkHoursForDay } from "../../domain/use-cases/shift/get-total-work-hours-for-day";
import { MockShiftRepository } from "../mocks/mock-shift-repository";

describe("GetTotalWorkHoursForDay Use Case", () => {
  it("should get total work hours for a day", async () => {
    const mockShiftRepository = new MockShiftRepository();
    const getTotalWorkHoursForDayUseCase = new GetTotalWorkHoursForDay(
      mockShiftRepository
    );

    const startShift1 = new Date();
    startShift1.setHours(8, 0, 0, 0);
    const endShift1 = new Date();
    endShift1.setHours(12, 0, 0, 0);

    const startShift2 = new Date();
    startShift2.setHours(13, 0, 0, 0);
    const endShift2 = new Date();
    endShift2.setHours(17, 0, 0, 0);

    // Create shifts
    await mockShiftRepository.create({
      id: 0,
      startShift: startShift1,
      endShift: endShift1,
      employeeId: "employee1",
    });

    await mockShiftRepository.create({
      id: 0,
      startShift: startShift2,
      endShift: endShift2,
      employeeId: "employee1",
    });

    // Get total work hours for the day
    const totalHours = await getTotalWorkHoursForDayUseCase.execute(
      "employee1",
      new Date()
    );

    expect(totalHours).toBe(8);
  });
});
