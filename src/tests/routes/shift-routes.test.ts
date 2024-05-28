import request from 'supertest';
import setupDatabase from '../setup-database';
import app from '../../server';

beforeAll(async () => {
  await setupDatabase();
});

describe('Shift Routes', () => {
  it('should start a new shift', async () => {
    // First, create an employee to start a shift for
    const createEmployeeResponse = await request(app)
      .post('/api/employees')
      .send({ name: "John Doe" });

    const { id: employeeId } = createEmployeeResponse.body;

    const response = await request(app)
      .post('/api/shifts/start')
      .send({ employeeId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("startShift");
    expect(response.body).toHaveProperty("endShift", null);
  });

  it('should return 500 on start shift error', async () => {
    const response = await request(app)
      .post('/api/shifts/start')
      .send({ employeeId: 'non-existing-id' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Error starting shift");
  });

  it('should end a shift', async () => {
    // First, create an employee to start and end a shift for
    const createEmployeeResponse = await request(app)
      .post('/api/employees')
      .send({ name: "John Doe" });

    const { id: employeeId } = createEmployeeResponse.body;

    // Start a shift for the employee
    const startShiftResponse = await request(app)
      .post('/api/shifts/start')
      .send({ employeeId });

    const { id } = startShiftResponse.body;

    // End the shift
    const response = await request(app)
      .post('/api/shifts/end')
      .send({ id, endShift: new Date().toISOString() });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("startShift");
    expect(response.body).toHaveProperty("endShift");
  });

  it('should return 500 on end shift error', async () => {
    const response = await request(app)
      .post('/api/shifts/end')
      .send({ id: 9999, endShift: new Date().toISOString() });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Error ending shift");
  });

  it('should get total work hours for an employee on a given day', async () => {
    // First, create an employee
    const createEmployeeResponse = await request(app)
      .post('/api/employees')
      .send({ name: "John Doe" });

    const { id: employeeId } = createEmployeeResponse.body;

    // Start and end a shift for the employee
    await request(app)
      .post('/api/shifts/start')
      .send({ employeeId });

    await request(app)
      .post('/api/shifts/end')
      .send({ id: 1, endShift: new Date().toISOString() });

    const response = await request(app).get(`/api/shifts/total-hours?employeeId=${employeeId}&date=${new Date().toISOString()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalHours");
  });
});
