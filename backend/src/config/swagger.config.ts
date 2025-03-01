import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Next Stock API",
        version: "1.0.0",
        description: "API documentation for the Next Stock project",
    },
    servers: [
        {
            url: "http://localhost:3200",
            description: "Local development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/modules/sector/*.ts',
        './src/modules/auth/*.ts',
        './src/modules/user/*.ts',
    ], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger docs available at http://localhost:3200/api-docs");
};
