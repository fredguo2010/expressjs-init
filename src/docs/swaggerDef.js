const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'rarockii_init_node_backend_mssqlv1 API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://gitlab.raiad.cn/shanghai-iad-poc-group/innovation-application-dev/rarockii_init_node_backend_mssqlv1.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
    },
  ],
};

module.exports = swaggerDef;
