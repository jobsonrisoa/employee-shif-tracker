'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employeeId = uuidv4();

    // Create an employee
    const employees = [
      {
        id: employeeId,
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('employees', employees, {});

    // Create shifts for the employee
    const shifts = [];
    const startDate = new Date();
    for (let i = 0; i < 7; i++) {
      const shiftStart = new Date(startDate);
      shiftStart.setDate(startDate.getDate() - i);
      shiftStart.setHours(9, 0, 0, 0); // Start at 9 AM
      const shiftEnd = new Date(shiftStart);
      shiftEnd.setHours(17, 0, 0, 0); // End at 5 PM (8 hours shift)

      shifts.push({
        startShift: shiftStart,
        endShift: shiftEnd,
        employeeId: employeeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('shifts', shifts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shifts', null, {});
    await queryInterface.bulkDelete('employees', null, {});
  }
};
