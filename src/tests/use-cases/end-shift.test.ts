import { EndShift } from "../../domain/use-cases/shift/end-shift";
import { MockShiftRepository } from "../mocks/mock-shift-repository";

describe("EndShift Use Case", () => {
  it("should end the current shift", async () => {
    const mockShiftRepository = new MockShiftRepository();
    const endShiftUseCase = new EndShift(mockShiftRepository);

    const startShift = new Date();
    startShift.setHours(8, 0, 0, 0);

    // Start a new shift
    const startedShift = await mockShiftRepository.startShift(
      "employee1",
      startShift
    );

    // End the shift
    const endShift = new Date();
    endShift.setHours(16, 0, 0, 0);
    const endedShift = await endShiftUseCase.execute({
      id: startedShift.id,
      startShift: startedShift.startShift,
      endShift,
      employeeId: startedShift.employeeId,
    });

    expect(endedShift).toHaveProperty("id");
    expect(endedShift.endShift).toEqual(endShift);
  });
});
