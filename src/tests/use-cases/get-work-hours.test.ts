import { GetWorkHours } from "../../domain/use-cases/shift/get-work-hours";
import { MockShiftRepository } from "../mocks/mock-shift-repository";

describe("GetWorkHours Use Case", () => {
  it("should get work hours for a given period", async () => {
    const mockShiftRepository = new MockShiftRepository();
    const getWorkHoursUseCase = new GetWorkHours(mockShiftRepository);

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

    // Get work hours for the day
    const shifts = await getWorkHoursUseCase.execute(
      "employee1",
      startShift1,
      endShift2
    );

    expect(shifts.length).toBe(2);
    expect(shifts[0].startShift).toEqual(startShift1);
    expect(shifts[0].endShift).toEqual(endShift1);
    expect(shifts[1].startShift).toEqual(startShift2);
    expect(shifts[1].endShift).toEqual(endShift2);
  });
});
