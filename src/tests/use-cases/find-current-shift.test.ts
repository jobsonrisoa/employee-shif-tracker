import { FindCurrentShift } from "../../domain/use-cases/shift/find-current-shift";
import { MockShiftRepository } from "../mocks/mock-shift-repository";

describe("FindCurrentShift Use Case", () => {
  it("should find the current shift for an employee", async () => {
    const mockShiftRepository = new MockShiftRepository();
    const findCurrentShiftUseCase = new FindCurrentShift(mockShiftRepository);

    const startShift = new Date();
    startShift.setHours(8, 0, 0, 0);

    // Start a new shift
    const startedShift = await mockShiftRepository.startShift(
      "employee1",
      startShift
    );

    // Find the current shift
    const currentShift = await findCurrentShiftUseCase.execute("employee1");

    expect(currentShift).toHaveProperty("id");
    expect(currentShift?.endShift).toBeNull();
    expect(currentShift?.startShift).toEqual(startShift);
  });
});
