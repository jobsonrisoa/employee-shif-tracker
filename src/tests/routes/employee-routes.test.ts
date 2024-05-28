import request from 'supertest';
import setupDatabase from '../setup-database';
import app from '../../server';

beforeAll(async () => {
  await setupDatabase();
});

describe('Employee Routes', () => {
  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({ name: "John Doe" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "John Doe");
  });

  it('should get an employee by ID', async () => {
    // First, create an employee
    const createResponse = await request(app)
      .post('/api/employees')
      .send({ name: "Jane Doe" });

    const { id } = createResponse.body;

    // Then, fetch the employee by ID
    const getResponse = await request(app).get(`/api/employees/${id}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty("id", id);
    expect(getResponse.body).toHaveProperty("name", "Jane Doe");
  });

  it('should return 404 if employee not found', async () => {
    const response = await request(app).get('/api/employees/non-existing-id');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Employee not found");
  });
});
