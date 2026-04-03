/**
 * EXAMPLE IMPLEMENTATION - User Service with Tests
 * 
 * This demonstrates how to use the test templates in practice
 */

// ============================================
// 1. SPECIFICATION (Spec Template)
// ============================================

// specs/user-service.spec.js
const userServiceSpec = {
  service: 'UserService',
  methods: [
    {
      name: 'create',
      description: 'Create a new user',
      params: { name: 'string', email: 'string', password: 'string' },
      returns: { id: 'string', name: 'string', email: 'string' },
      throws: ['DuplicateEmailError', 'ValidationError'],
    },
    {
      name: 'getById',
      description: 'Get user by ID',
      params: { id: 'string' },
      returns: { id: 'string', name: 'string', email: 'string' },
      throws: ['NotFoundError'],
    },
  ],
};

// ============================================
// 2. SERVICE IMPLEMENTATION
// ============================================

// src/services/user.service.js
class UserService {
  constructor(database) {
    this.db = database;
  }

  async create(userData) {
    // Validate input
    if (!userData.email || !userData.name || !userData.password) {
      throw new Error('Missing required fields');
    }

    // Check for duplicates
    const existing = await this.db.findOne('users', { email: userData.email });
    if (existing) {
      throw new Error('Email already exists');
    }

    // Hash password and create user
    const hashedPassword = await this.hashPassword(userData.password);
    const user = {
      id: this.generateId(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    await this.db.insert('users', user);
    return { id: user.id, name: user.name, email: user.email };
  }

  async getById(userId) {
    const user = await this.db.findOne('users', { id: userId });
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name, email: user.email };
  }

  // Helpers
  generateId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }

  async hashPassword(password) {
    // Mock implementation
    return 'hashed_' + password;
  }
}

// ============================================
// 3. UNIT TEST (Unit Test Template)
// ============================================

// src/services/user.service.unit.test.js
describe('UserService - Unit Tests', () => {
  let userService;
  let mockDb;

  beforeEach(() => {
    // Mock the database
    mockDb = {
      findOne: jest.fn(),
      insert: jest.fn(),
    };

    userService = new UserService(mockDb);
  });

  describe('create', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      };
      mockDb.findOne.mockResolvedValue(null); // No existing user
      mockDb.insert.mockResolvedValue(undefined);

      // Act
      const result = await userService.create(userData);

      // Assert
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.id).toBeDefined();
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should throw error for missing email', async () => {
      // Arrange
      const userData = { name: 'John Doe', password: 'pass' };

      // Act & Assert
      await expect(userService.create(userData)).rejects.toThrow('Missing required fields');
    });

    it('should throw error for duplicate email', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'duplicate@example.com',
        password: 'pass',
      };
      mockDb.findOne.mockResolvedValue({ id: 'existing-user' });

      // Act & Assert
      await expect(userService.create(userData)).rejects.toThrow('Email already exists');
    });
  });

  describe('getById', () => {
    it('should return user when found', async () => {
      // Arrange
      const mockUser = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_pass',
      };
      mockDb.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await userService.getById('user-123');

      // Assert
      expect(result).toEqual({
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should throw error when user not found', async () => {
      // Arrange
      mockDb.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.getById('nonexistent')).rejects.toThrow('User not found');
    });
  });
});

// ============================================
// 4. INTEGRATION TEST (Integration Test Template)
// ============================================

// src/services/user.service.integration.test.js
describe('UserService - Integration Tests', () => {
  let userService;
  let testDb;

  beforeAll(async () => {
    // Setup real or in-memory test database
    testDb = new Database(':memory:');
    await testDb.initialize();
    userService = new UserService(testDb);
  });

  afterAll(async () => {
    await testDb.close();
  });

  afterEach(async () => {
    await testDb.clear('users');
  });

  describe('User CRUD Flow', () => {
    it('should create and retrieve user', async () => {
      // Arrange & Act - Create
      const created = await userService.create({
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'pass',
      });

      // Act - Retrieve
      const retrieved = await userService.getById(created.id);

      // Assert
      expect(retrieved.id).toBe(created.id);
      expect(retrieved.name).toBe('Jane Smith');
      expect(retrieved.email).toBe('jane@example.com');
    });

    it('should persist data across operations', async () => {
      // Arrange & Act - Create multiple users
      const user1 = await userService.create({
        name: 'User 1',
        email: 'user1@example.com',
        password: 'pass',
      });

      const user2 = await userService.create({
        name: 'User 2',
        email: 'user2@example.com',
        password: 'pass',
      });

      // Act - Retrieve both
      const retrieved1 = await userService.getById(user1.id);
      const retrieved2 = await userService.getById(user2.id);

      // Assert
      expect(retrieved1.email).toBe('user1@example.com');
      expect(retrieved2.email).toBe('user2@example.com');
    });
  });
});

// ============================================
// 5. E2E TEST (E2E Test Template)
// ============================================

// tests/e2e/user-registration.e2e.test.js
const request = require('supertest');
const app = require('../../src/server');

describe('User Registration E2E Flow', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  describe('Complete Registration & Login Flow', () => {
    it('should register user and access protected route', async () => {
      // Arrange & Act - Register
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'SecurePass123!',
        });

      // Assert registration
      expect(registerRes.status).toBe(201);
      expect(registerRes.body.userId).toBeDefined();

      const userId = registerRes.body.userId;

      // Act - Login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: registerRes.body.email,
          password: 'SecurePass123!',
        });

      // Assert login
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeDefined();

      const token = loginRes.body.token;

      // Act - Access protected route
      const userRes = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      // Assert access
      expect(userRes.status).toBe(200);
      expect(userRes.body.id).toBe(userId);
    });
  });
});

module.exports = {
  userServiceSpec,
  UserService,
};
