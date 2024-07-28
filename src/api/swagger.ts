const swaggerAutogen = require('swagger-autogen')();

const port = 3000;
const outputFile = './swagger.json';
const routes = ['./index.ts'];

const doc = {
  info: {
    title: 'Tech Challenge 7SOAT',
    description: ''
  },
  host: `localhost:${port}`
};


swaggerAutogen(outputFile, routes, doc);
