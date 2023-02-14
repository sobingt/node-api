const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Flutter Assignment API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/sobingt/flutter-assignment-api/blob/master/LICENSE',
    },
  },
  servers: [    
    {
      url: `https://interview-api.onrender.com/v1`,
    },
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
