export const swaggerText = {
  auth: {
    login: {
      summary: 'Login',
      description:
        'Enter your user credentials, if they are correct the server will return an AccessToken and you must place that token in "Authorize" to log in and access the other routes.',
    },
  },
  user: {
    register: {
      summary: 'Register - Public Access',
      description:
        'Enter the required data to be able to create a user in the database and then you can log in.',
    },
    getAllUsers: {
      summary: 'Get All Users - Admin Access',
      description: 'Returns all active users in the database.',
    },
    getUserById: {
      summary: 'Get User By Id - Authorized',
      description: 'Returns an active user from the database based on the ID.',
    },
    updateUser: {
      summary: 'Update User - Authorized',
      description: 'Updates an active database user.',
    },
    deleteUser: {
      summary: 'Delete User - Adminn Access',
      description: 'Delete a user',
    },
  },
  note: {
    createNote: {
      summary: 'Create Note - Public Access',
      description:
        'Enter the credentials required to create a note (In "user" enter the user ID).',
    },
    getAllNotes: {
      summary: 'Get All Notes - Admin Access',
      description: 'Returns all active notes in the database',
    },
    getNoteById: {
      summary: 'Get Note By Id - Authorized',
      description:
        'Returns an active note from the database according to the ID',
    },
    updateNote: {
      summary: 'Update Note - Authorized',
      description: 'Updates an active note from the database.',
    },
    deleteNote: {
      summary: 'Delete Note - Admin Access',
      description: 'Delete a note',
    },
  },
};
