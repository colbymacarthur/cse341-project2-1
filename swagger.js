const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Project 2',
        description: 'API Documentation',
    },
    host: 'localhost:3000',
    schemes: [ 'http', 'https' ],
};
    
const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
