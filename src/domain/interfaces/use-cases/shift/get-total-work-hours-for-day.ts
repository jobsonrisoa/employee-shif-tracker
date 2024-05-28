export interface GetTotalWorkHoursForDayUseCase {
  execute(employeeId: string, date: Date): Promise<number>;
}
