/**
 * TEST HELPERS & UTILITIES
 * 
 * Common test utilities for all test types
 */

// Database helpers
const createTestDatabase = async () => {
  // Initialize in-memory database
  // const db = new Database(':memory:');
  // await db.initialize();
  // return db;
};

const seedTestData = async (db, table, data) => {
  // Insert test data
  // for (const record of data) {
  //   await db.insert(table, record);
  // }
};

// Mock data generators
const createMockUser = (overrides = {}) => {
  return {
    id: 'user-' + Math.random().toString(36).substr(2, 9),
    name: 'Test User',
    email: `test+${Date.now()}@example.com`,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
};

const createMockToken = (overrides = {}) => {
  return {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    expiresIn: 3600,
    type: 'Bearer',
    ...overrides,
  };
};

// Assertion helpers
const expectValidUUID = (value) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  expect(value).toMatch(uuidRegex);
};

const expectValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(value).toMatch(emailRegex);
};

const expectValidISO8601 = (value) => {
  expect(() => new Date(value).toISOString()).not.toThrow();
  expect(new Date(value).toISOString()).toBe(value);
};

// Request helpers
const createAuthHeaders = (token) => {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Async helpers
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const waitFor = async (condition, timeout = 5000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (condition()) return true;
    await delay(100);
  }
  throw new Error('Timeout waiting for condition');
};

module.exports = {
  createTestDatabase,
  seedTestData,
  createMockUser,
  createMockToken,
  expectValidUUID,
  expectValidEmail,
  expectValidISO8601,
  createAuthHeaders,
  delay,
  waitFor,
};
