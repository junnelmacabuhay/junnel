/**
 * SPEC TEMPLATE - API Endpoint Specification
 * 
 * Use this template to document API endpoints before writing tests.
 * Each endpoint should have clear requirements, behaviors, and edge cases.
 */

module.exports = {
  endpoint: {
    method: 'GET',
    path: '/api/users/:id',
    description: 'Retrieve a user by ID',
  },
  
  authentication: {
    required: true,
    type: 'bearer_token',
  },
  
  parameters: [
    {
      name: 'id',
      type: 'string',
      required: true,
      description: 'User ID (UUID format)',
    },
  ],
  
  request: {
    headers: {
      'Authorization': 'Bearer <token>',
      'Content-Type': 'application/json',
    },
  },
  
  responses: {
    success: {
      status: 200,
      description: 'User found',
      schema: {
        id: 'string (UUID)',
        name: 'string',
        email: 'string (email)',
        createdAt: 'ISO 8601 timestamp',
      },
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-15T10:30:00Z',
      },
    },
    notFound: {
      status: 404,
      description: 'User not found',
      schema: {
        error: 'string',
        message: 'string',
      },
    },
    unauthorized: {
      status: 401,
      description: 'Missing or invalid authentication token',
    },
    badRequest: {
      status: 400,
      description: 'Invalid user ID format',
    },
  },
  
  behaviors: [
    'Returns user object when user exists',
    'Returns 404 when user does not exist',
    'Returns 401 when authentication fails',
    'Returns 400 when ID format is invalid',
    'Validates token expiration',
  ],
  
  edgeCases: [
    'Deleted users should return 404',
    'Archived users should still be retrievable',
    'Non-existent user IDs should return 404',
    'Malformed UUID should return 400',
  ],
};
