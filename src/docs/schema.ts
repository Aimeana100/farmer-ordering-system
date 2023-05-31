export default {
  User: {
    type: 'object',

    properties: {
      id: {
        type: 'uuid',
        description: 'The auto-generated id ',
      },
      names: {
        type: 'string',
        description: 'name name',
      },
      status: {
        type: 'string',
        description: 'user email',
      },
      password: {
        type: 'string',
        description: 'user password //hidden',
      },
      role: { type: 'string', description: 'user role in dbs' },
      phone: {
        type: 'string',
        description: 'user phone number',
      },
      permissions: {
        type: 'Array(string)',
        description: 'describes the permissions ceratain users have',
      },
    },
  },
};
