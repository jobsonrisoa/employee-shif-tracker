export interface ShiftRequestModel {
  id: number;
  startShift: Date;
  endShift: Date | null;
  employeeId: string;
}

export interface ShiftResponseModel {
  id: number;
  startShift: Date;
  endShift: Date | null;
  employeeId: string;
}
