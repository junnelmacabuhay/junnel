# Test Framework Setup Guide

This project uses **Jest** as the primary testing framework with support for unit tests, integration tests, and E2E tests.

## Quick Start

### Installation

```bash
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## Test Types

### 1. **Unit Tests** (`*.unit.test.js`)

**Purpose**: Test individual functions or components in isolation

**Characteristics**:
- Fast (milliseconds)
- Mock all external dependencies
- Focus on single responsibility
- Cover happy paths, edge cases, error scenarios

**Example**:
```javascript
describe('calculateDiscount', () => {
  it('should calculate 10% discount on $100', () => {
    const result = calculateDiscount(100, 10);
    expect(result).toBe(10);
  });
});
```

**When to write**:
- New utility functions
- Component logic
- Service methods
- Before integration tests

### 2. **Integration Tests** (`*.integration.test.js`)

**Purpose**: Test multiple components/layers working together

**Characteristics**:
- Test real interactions between modules
- Use test database with realistic data
- Verify data flow across layers
- Medium speed (seconds)

**Example**:
```javascript
describe('User Service Integration', () => {
  it('should create and retrieve user', async () => {
    const user = await userService.create({ name: 'John' });
    const retrieved = await userService.getById(user.id);
    expect(retrieved.name).toBe('John');
  });
});
```

**When to write**:
- After unit tests pass
- When multiple services interact
- Database operations
- Complex business logic flows

### 3. **E2E Tests** (`*.e2e.test.js`)

**Purpose**: Test complete user workflows end-to-end

**Characteristics**:
- Test full application flow
- Include frontend and backend
- Use near-real application state
- Slow (seconds to minutes)
- Use `supertest` for HTTP testing or Cypress/Playwright for UI

**Example**:
```javascript
describe('User Registration Flow', () => {
  it('should register and login user', async () => {
    // Register
    const registerRes = await request(app).post('/api/auth/register')
      .send({ email: 'test@example.com', password: '...' });
    
    // Login
    const loginRes = await request(app).post('/api/auth/login')
      .send({ email: 'test@example.com', password: '...' });
    
    expect(loginRes.body.token).toBeDefined();
  });
});
```

**When to write**:
- Critical user workflows
- After unit and integration tests
- Cross-feature flows
- Authentication/authorization

## File Organization

```
my-app/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── user.controller.js
│   │   │   └── user.controller.unit.test.js
│   │   └── user.api.integration.test.js
│   ├── services/
│   │   ├── user.service.js
│   │   └── user.service.unit.test.js
│   └── utils/
│       ├── helpers.js
│       └── helpers.unit.test.js
├── tests/
│   ├── e2e/
│   │   ├── user-registration.e2e.test.js
│   │   └── helpers/
│   │       └── test-setup.js
│   └── fixtures/
│       └── users.fixture.js
├── specs/
│   ├── api-endpoints.spec.js
│   └── user-service.spec.js
└── jest.config.js
```

## Writing Tests - AAA Pattern

Every test should follow the **Arrange-Act-Assert** pattern:

```javascript
describe('UserService', () => {
  it('should update user email', () => {
    // ARRANGE - Setup test data and mocks
    const userId = 'user-123';
    const newEmail = 'new@example.com';
    
    // ACT - Execute the code being tested
    const result = userService.update(userId, { email: newEmail });
    
    // ASSERT - Verify the results
    expect(result.email).toBe(newEmail);
  });
});
```

## Test Naming Conventions

| Pattern | Example | Usage |
|---------|---------|-------|
| should... | `should return user data` | Typical behavior |
| must... | `must validate email` | Required behavior |
| when... | `when user exists, should return 200` | Conditional behavior |

### Good Test Names
✓ `should return 404 when user does not exist`
✓ `should calculate discount correctly for decimals`
✓ `must validate email format`

### Bad Test Names
✗ `should work` (too vague)
✗ `test user function` (not descriptive)
✗ `should return something` (unclear what)

## Mocking

### Mock External Dependencies

```javascript
// Mock database
jest.spyOn(db, 'query').mockResolvedValue({ id: 1, name: 'John' });

// Mock API call
jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

// Mock file system
jest.spyOn(fs, 'readFile').mockResolvedValue('file contents');
```

### Clear Mocks Between Tests

```javascript
afterEach(() => {
  jest.clearAllMocks();
});
```

## Test Helpers

Use the provided test helpers in `test-helpers.js`:

```javascript
const { 
  createMockUser, 
  expectValidEmail,
  createAuthHeaders 
} = require('../test-helpers');

// Create mock data
const mockUser = createMockUser({ name: 'John Smith' });

// Validate email format
expectValidEmail('test@example.com');

// Create auth headers
const headers = createAuthHeaders(token);
```

## Coverage Requirements

Current coverage thresholds (configured in `jest.config.js`):
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

View coverage report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Best Practices

### ✓ DO

- ✓ Write tests before or alongside code (TDD)
- ✓ Keep tests simple and focused
- ✓ Test behavior, not implementation
- ✓ Use meaningful test descriptions
- ✓ Mock external dependencies
- ✓ Run tests frequently
- ✓ Keep tests independent
- ✓ Use fixtures for common test data

### ✗ DON'T

- ✗ Write tests that depend on each other
- ✗ Test implementation details
- ✗ Use generic test descriptions
- ✗ Skip error case tests
- ✗ Leave commented-out tests
- ✗ Mock the unit under test
- ✗ Test too many things in one test

## Troubleshooting

### Tests run slowly
```bash
# Run tests in parallel
npm test -- --maxWorkers=4

# Run only changed tests
npm test -- --onlyChanged
```

### Specific test fails
```bash
# Run only one test file
npm test -- user.unit.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should calculate"
```

### Mock not working
- Ensure mock is set up before function call
- Clear mocks between tests with `jest.clearAllMocks()`
- Check import paths match mock setup

### Timeout issues
```javascript
// Increase timeout for specific test
it('slow operation', async () => {
  // test code
}, 10000); // 10 second timeout
```

## Spec Templates

The following spec templates are provided:

1. **api-endpoint.spec.js** - API endpoint specification template
2. **function.spec.js** - Function/utility specification template

Use these to document requirements before writing tests.

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [TEST-GUIDE.md](./TEST-GUIDE.md) - Detailed testing guidelines

## Next Steps

1. Set up database fixtures in `tests/fixtures/`
2. Create E2E test helpers in `tests/e2e/helpers/`
3. Write specifications for your features in `specs/`
4. Create unit tests for each module
5. Create integration tests for service layers
6. Create E2E tests for user workflows

Happy testing! 🚀
