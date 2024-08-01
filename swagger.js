const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "E-commerce API",
      description: "API for an E-commerce application",
      version: "1.0.0"
    },
    servers: [
      { url: "http://localhost:3000" }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
