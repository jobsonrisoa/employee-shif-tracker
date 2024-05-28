import { Router, Request, Response } from "express";
import { StartShiftUseCase } from "../../domain/interfaces/use-cases/shift/start-shift";
import { EndShiftUseCase } from "../../domain/interfaces/use-cases/shift/end-shift";
import { FindCurrentShiftUseCase } from "../../domain/interfaces/use-cases/shift/find-current-shift";
import { GetWorkHoursUseCase } from "../../domain/interfaces/use-cases/shift/get-work-hours";
import { GetTotalWorkHoursForDayUseCase } from "../../domain/interfaces/use-cases/shift/get-total-work-hours-for-day";

export default function createShiftRoutes(
  startShiftUseCase: StartShiftUseCase,
  endShiftUseCase: EndShiftUseCase,
  findCurrentShiftUseCase: FindCurrentShiftUseCase,
  getWorkHoursUseCase: GetWorkHoursUseCase,
  getTotalWorkHoursForDayUseCase: GetTotalWorkHoursForDayUseCase
): Router {
  const router = Router();

  /**
   * @swagger
   * /api/shifts/start:
   *   post:
   *     summary: Start a new shift
   *     tags: [Shifts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               employeeId:
   *                 type: string
   *                 example: "1"
   *               startShift:
   *                 type: string
   *                 format: date-time
   *     responses:
   *       201:
   *         description: Shift started successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Shift'
   *       500:
   *         description: Error starting shift
   */
  router.post("/shifts/start", async (req: Request, res: Response) => {
    const { employeeId, startShift } = req.body;
    try {
      const shift = await startShiftUseCase.execute(
        employeeId,
        new Date(startShift)
      );
      res.status(201).json(shift);
    } catch (error) {
      res.status(500).json({ message: "Error starting shift" });
    }
  });

  /**
   * @swagger
   * /api/shifts/end:
   *   post:
   *     summary: End a shift
   *     tags: [Shifts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *                 example: 1
   *               endShift:
   *                 type: string
   *                 format: date-time
   *               startShift:
   *                 type: string
   *                 format: date-time
   *               employeeId:
   *                 type: string
   *                 example: "1"
   *     responses:
   *       200:
   *         description: Shift ended successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Shift'
   *       500:
   *         description: Error ending shift
   */
  router.post("/shifts/end", async (req: Request, res: Response) => {
    const { id, endShift, startShift, employeeId } = req.body;
    try {
      const shift = await endShiftUseCase.execute({
        id,
        endShift: new Date(endShift),
        startShift: new Date(startShift),
        employeeId,
      });
      res.status(200).json(shift);
    } catch (error) {
      res.status(500).json({ message: "Error ending shift" });
    }
  });

  /**
   * @swagger
   * /api/shifts/current/{employeeId}:
   *   get:
   *     summary: Get current shift of an employee
   *     tags: [Shifts]
   *     parameters:
   *       - in: path
   *         name: employeeId
   *         required: true
   *         schema:
   *           type: string
   *         example: "1"
   *     responses:
   *       200:
   *         description: Current shift fetched successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Shift'
   *       404:
   *         description: Shift not found
   */
  router.get(
    "/shifts/current/:employeeId",
    async (req: Request, res: Response) => {
      const { employeeId } = req.params;
      try {
        const shift = await findCurrentShiftUseCase.execute(employeeId);
        if (shift) {
          res.status(200).json(shift);
        } else {
          res.status(404).json({ message: "Shift not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error fetching current shift" });
      }
    }
  );

  /**
   * @swagger
   * /api/shifts/hours:
   *   get:
   *     summary: Get work hours for an employee
   *     parameters:
   *       - in: query
   *         name: employeeId
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the employee
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date
   *         required: true
   *         description: The start date for the work hours
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date
   *         required: true
   *         description: The end date for the work hours
   *     responses:
   *       200:
   *         description: Work hours
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Shift'
   *       500:
   *         description: Error fetching work hours
   */
  router.get("/shifts/hours", async (req: Request, res: Response) => {
    const { employeeId, startDate, endDate } = req.query;

    if (!employeeId || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    try {
      const workHours = await getWorkHoursUseCase.execute(
        employeeId as string,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(workHours);
    } catch (error) {
      console.error("Error fetching work hours:", error);
      res
        .status(500)
        .json({
          message: "Error fetching work hours",
          error: (error as Error).message,
        });
    }
  });

  /**
   * @swagger
   * /api/shifts/total-hours:
   *   get:
   *     summary: Get total work hours for an employee on a specific day
   *     tags: [Shifts]
   *     parameters:
   *       - in: query
   *         name: employeeId
   *         required: true
   *         schema:
   *           type: string
   *         example: "1"
   *       - in: query
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *     responses:
   *       200:
   *         description: Total work hours fetched successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: number
   *               example: 8
   *       404:
   *         description: No shifts found for the specified date
   */
  router.get("/shifts/total-hours", async (req: Request, res: Response) => {
    const { employeeId, date } = req.query;
    try {
      const totalHours = await getTotalWorkHoursForDayUseCase.execute(
        employeeId as string,
        new Date(date as string)
      );
      res.status(200).json({ totalHours });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total work hours" });
    }
  });

  return router;
}
