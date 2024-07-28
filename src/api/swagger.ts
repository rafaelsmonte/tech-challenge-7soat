const swaggerAutogen = require('swagger-autogen')();

const port = 3000;
const outputFile = './swagger-auto.json';
const routes = ['./index.ts'];

const doc = {
  info: {
    title: 'Tech Challenge 7SOAT',
    description: ''
  },
  host: `10.100.61.151:${port}`
};


swaggerAutogen(outputFile, routes, doc);
