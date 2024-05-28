import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Shift Tracker API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Employee: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
        },
        Shift: {
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            startShift: {
              type: "string",
              format: "date-time",
            },
            endShift: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            employeeId: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/presentation/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
