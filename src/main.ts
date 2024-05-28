// src/main.ts
import 'dotenv/config'; // Load environment variables from .env file

import server from "./server";
import { setupSwagger } from "./swagger";
import { sequelize } from "./data/data-sources/sequelize";

// Import Sequelize models and data sources
import { SequelizeEmployeeDataSource } from "./data/data-sources/sequelize/sequelize-employee-data-source";
import { SequelizeShiftDataSource } from "./data/data-sources/sequelize/sequelize-shift-data-source";

// Import use case implementations
import { CreateEmployee } from "./domain/use-cases/employee/create-employee";
import { GetEmployee } from "./domain/use-cases/employee/get-employee";
import { StartShift } from "./domain/use-cases/shift/start-shift";
import { EndShift } from "./domain/use-cases/shift/end-shift";
import { FindCurrentShift } from "./domain/use-cases/shift/find-current-shift";
import { GetWorkHours } from "./domain/use-cases/shift/get-work-hours";
import { GetTotalWorkHoursForDay } from "./domain/use-cases/shift/get-total-work-hours-for-day";

// Import repositories
import { EmployeeRepositoryImpl } from "./domain/repositories/employee-repository";
import { ShiftRepositoryImpl } from "./domain/repositories/shift-repository";

// Import routes
import createEmployeeRoutes from "./presentation/routes/employee-router";
import createShiftRoutes from "./presentation/routes/shift-router";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sync database models
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Setup Swagger
setupSwagger(server);

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
server.use("/api", createEmployeeRoutes(createEmployeeUseCase, getEmployeeUseCase));
server.use("/api", createShiftRoutes(startShiftUseCase, endShiftUseCase, findCurrentShiftUseCase, getWorkHoursUseCase, getTotalWorkHoursForDayUseCase));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
