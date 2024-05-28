import { execSync } from 'child_process';
import path from 'path';

const setupDatabase = async () => {
  process.env.DATABASE_URL = 'postgres://postgres:password@localhost:5432/employee_shift_tracker_test';
  
  // Run migrations
  const migrationPath = path.resolve(__dirname, '../../src/data/data-sources/sequelize/migrations');
  execSync(`npx sequelize-cli db:migrate --url ${process.env.DATABASE_URL} --migrations-path ${migrationPath}`);
  
  // Run seeders
  const seedersPath = path.resolve(__dirname, '../../src/data/data-sources/sequelize/seeders');
  execSync(`npx sequelize-cli db:seed:all --url ${process.env.DATABASE_URL} --seeders-path ${seedersPath}`);
};

export default setupDatabase;
