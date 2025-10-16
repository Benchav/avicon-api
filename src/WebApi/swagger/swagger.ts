import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Avicon API",
      version: "1.0.0",
      description: "API for managing Avicon",
      contact: {
        name: "Oscar Molina and Joshua Chavez",
      },
    },
    servers: [
       {
         url: "http://localhost:3000",
         description: "Local server",
       },
      {
        url: "https://avicon-api.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          // ✅ Nombre del esquema de seguridad
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // ✅ Aplica globalmente a todos los endpoints
      },
    ],
  },
  apis: ["dist/WebApi/routes/*.js","src/WebApi/routes/*.ts", ],
};

const specs = swaggerJsdoc(options);
export default specs;