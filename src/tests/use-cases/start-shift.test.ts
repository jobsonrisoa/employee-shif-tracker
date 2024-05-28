import { StartShift } from "../../domain/use-cases/shift/start-shift";
import { MockShiftRepository } from "../mocks/mock-shift-repository";

describe("StartShift Use Case", () => {
  it("should start a new shift", async () => {
    const mockShiftRepository = new MockShiftRepository();
    const startShiftUseCase = new StartShift(mockShiftRepository);

    const startShift = new Date();
    startShift.setHours(8, 0, 0, 0);

    const newShift = await startShiftUseCase.execute("employee1", startShift);

    expect(newShift).toHaveProperty("id");
    expect(newShift.startShift).toEqual(startShift);
    expect(newShift.employeeId).toBe("employee1");
  });
});
