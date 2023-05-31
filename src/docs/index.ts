import swagger from 'swagger-ui-express';
import Router from 'express';
import schema from './schema';
import test from './test';
const { serve, setup } = swagger;

const swaggerRouter = Router();
const options = {
  openapi: '3.0.0',
  info: {
    title: 'FARMER ORDERING SYSTEM',
    version: '1.0.0',
    description: 'This is the API documentation for the routes and endpoint for the farmer ordering system.',
    contact: {
      name: 'KARINGANIRE Anathole',
      email: 'aimeanathole@gmail.com',
      'x-linkedin': 'https://www.linkedin.com/in/karinganire-anathole-610979185/',
      'x-github': 'https://github.com/Aimeana100',
    },
  },
  api: `http://localhost:${process.env.APP_PORT || 8082}`,
  security: [{ beaeAuth: [] }],
  components: {
    schema,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  tags: [
    {
      name: 'test',
      description: 'Testing the swagger-ui-express',
    },
  ],
  paths: { ...test },
};

swaggerRouter.use('/docs', serve, setup(options));

export default swaggerRouter;
