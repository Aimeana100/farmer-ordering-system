export default {
  '/': {
    get: {
      tags: ['test'],
      description: 'Testing',
      parameters: [],
      requestBody: {},
      responses: {
        200: {
          description: 'Tested success',
        },
      },
    },
  },
};
