// src/data/data-sources/sequelize/index.ts
import { Sequelize } from 'sequelize';
import { initEmployeeModel, Employee } from './models/employee';
import { initShiftModel, Shift } from './models/shift';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
});

// Initialize models
initEmployeeModel(sequelize);
initShiftModel(sequelize);

// Setup associations
Employee.hasMany(Shift, {
  foreignKey: 'employeeId',
  as: 'shifts',
});
Shift.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
});

export { sequelize };
