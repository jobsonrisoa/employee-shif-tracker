import express from 'express';
import { setupSwagger } from './swagger';
import createEmployeeRoutes from './presentation/routes/employee-router';
import createShiftRoutes from './presentation/routes/shift-router';
import { SequelizeEmployeeDataSource } from './data/data-sources/sequelize/sequelize-employee-data-source';
import { SequelizeShiftDataSource } from './data/data-sources/sequelize/sequelize-shift-data-source';
import { CreateEmployee } from './domain/use-cases/employee/create-employee';
import { GetEmployee } from './domain/use-cases/employee/get-employee';
import { StartShift } from './domain/use-cases/shift/start-shift';
import { EndShift } from './domain/use-cases/shift/end-shift';
import { FindCurrentShift } from './domain/use-cases/shift/find-current-shift';
import { GetWorkHours } from './domain/use-cases/shift/get-work-hours';
import { GetTotalWorkHoursForDay } from './domain/use-cases/shift/get-total-work-hours-for-day';
import { EmployeeRepositoryImpl } from './domain/repositories/employee-repository';
import { ShiftRepositoryImpl } from './domain/repositories/shift-repository';

const app = express();
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Data sources
const employeeDataSource = new SequelizeEmployeeDataSource();
const shiftDataSource = new SequelizeShiftDataSource();

// Repositories
const employeeRepository = new EmployeeRepositoryImpl(employeeDataSource);
const shiftRepository = new ShiftRepositoryImpl(shiftDataSource);

// Use cases
const createEmployeeUseCase = new CreateEmployee(employeeRepository);
const getEmployeeUseCase = new GetEmployee(employeeRepository);
const startShiftUseCase = new StartShift(shiftRepository);
const endShiftUseCase = new EndShift(shiftRepository);
const findCurrentShiftUseCase = new FindCurrentShift(shiftRepository);
const getWorkHoursUseCase = new GetWorkHours(shiftRepository);
const getTotalWorkHoursForDayUseCase = new GetTotalWorkHoursForDay(shiftRepository);

// Routes
app.use("/api", createEmployeeRoutes(createEmployeeUseCase, getEmployeeUseCase));
app.use("/api", createShiftRoutes(startShiftUseCase, endShiftUseCase, findCurrentShiftUseCase, getWorkHoursUseCase, getTotalWorkHoursForDayUseCase));

export default app;
