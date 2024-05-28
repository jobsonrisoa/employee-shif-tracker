import { Router, Request, Response } from 'express';
import { CreateEmployeeUseCase } from '../../domain/interfaces/use-cases/employee/create-employee';
import { GetEmployeeUseCase } from '../../domain/interfaces/use-cases/employee/get-employee';

const createEmployeeRoutes = (
  createEmployeeUseCase: CreateEmployeeUseCase,
  getEmployeeUseCase: GetEmployeeUseCase
) => {
  const router = Router();

  /**
   * @swagger
   * /api/employees:
   *   post:
   *     summary: Create a new employee
   *     tags: [Employee]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *             example:
   *               name: "John Doe"
   *     responses:
   *       201:
   *         description: Employee created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Employee'
   *       500:
   *         description: Error creating employee
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  router.post('/employees', async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const employee = await createEmployeeUseCase.execute({ name });
      res.status(201).json(employee);
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Error creating employee', error: (error as Error).message });
    }
  });

  /**
   * @swagger
   * /api/employees/{id}:
   *   get:
   *     summary: Get an employee by ID
   *     tags: [Employee]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Employee ID
   *     responses:
   *       200:
   *         description: Employee found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Employee'
   *       404:
   *         description: Employee not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  router.get('/employees/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await getEmployeeUseCase.execute(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error('Error getting employee:', error);
      res.status(500).json({ message: 'Error getting employee', error: (error as Error).message });
    }
  });

  return router;
};

export default createEmployeeRoutes;
