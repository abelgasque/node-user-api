const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "user-api",
      description: "Aplicação para gestão de usuários.",
      version: "1.0.0",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["firstName", "lastName", "email", "password", "active"],
          properties: {
            firstName: {
              type: "string",
              description: "Primeiro nome do usuário",
            },
            lastName: {
              type: "string",
              description: "Sobrenome do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Endereço de e-mail do usuário",
            },
            password: {
              type: "string",
              format: "password",
              description: "Senha do usuário (mínimo de 7 caracteres)",
            },
            active: {
              type: "boolean",
              description: "Indica se o usuário está ativo ou não",
            },
          },
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: process.env.JWT_SECRET,
        name: 'Authorization',
        in: 'header',
        scheme: 'bearer',
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};