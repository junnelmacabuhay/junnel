/**
 * TEST NAMING & ORGANIZATION GUIDE
 * 
 * This document outlines best practices for organizing and naming tests
 */

/**
 * FILE NAMING CONVENTIONS
 * 
 * - Unit tests: <module>.unit.test.js
 * - Integration tests: <module>.integration.test.js
 * - E2E tests: <feature>.e2e.test.js
 * - Specs: <module>.spec.js
 * - Helpers: <module>.test.helpers.js
 */

/**
 * DIRECTORY STRUCTURE RECOMMENDATION
 * 
 * my-app/
 * ├── src/
 * │   ├── api/
 * │   │   ├── controllers/
 * │   │   │   ├── user.controller.js
 * │   │   │   └── user.controller.unit.test.js
 * │   │   ├── routes/
 * │   │   │   └── user.routes.js
 * │   │   └── user.api.integration.test.js
 * │   ├── services/
 * │   │   ├── user.service.js
 * │   │   └── user.service.unit.test.js
 * │   ├── utils/
 * │   │   ├── helpers.js
 * │   │   └── helpers.unit.test.js
 * │   └── server.js
 * ├── tests/
 * │   ├── e2e/
 * │   │   ├── user-registration.e2e.test.js
 * │   │   ├── user-profile.e2e.test.js
 * │   │   └── helpers/
 * │   │       └── test-setup.js
 * │   └── fixtures/
 * │       └── users.fixture.js
 * ├── specs/
 * │   ├── api-endpoints.spec.js
 * │   └── user-service.spec.js
 * ├── jest.config.js
 * ├── package.json
 * └── README.md
 */

/**
 * DESCRIBE BLOCK STRUCTURE
 * 
 * Use nested describe blocks to organize tests hierarchically:
 * 
 * describe('UserController', () => {
 *   describe('GET /users/:id', () => {
 *     describe('when user exists', () => {
 *       it('should return user data');
 *     });
 *     describe('when user does not exist', () => {
 *       it('should return 404');
 *     });
 *   });
 * });
 */

/**
 * TEST NAMING BEST PRACTICES
 * 
 * 1. Use "should" or "must" prefix
 *    it('should return user data when id is valid');
 *    it('must validate email format');
 * 
 * 2. Be specific and descriptive
 *    ✓ it('should return 404 when user does not exist');
 *    ✗ it('should return error');
 * 
 * 3. One assertion per test (or related assertions)
 *    ✓ it('should have name and email properties');
 *    ✗ it('should return user, validate email, and check permissions');
 * 
 * 4. Test behavior, not implementation
 *    ✓ it('should calculate discount amount correctly');
 *    ✗ it('should multiply price by discount and divide by 100');
 */

/**
 * AAA PATTERN (Arrange-Act-Assert)
 * 
 * Every test should follow this structure:
 * 
 * it('should update user name', () => {
 *   // ARRANGE - Setup test data and mocks
 *   const userId = 'user-123';
 *   const newName = 'John Smith';
 *   jest.spyOn(userService, 'update').mockResolvedValue({ id: userId, name: newName });
 *   
 *   // ACT - Execute the function being tested
 *   const result = userService.update(userId, { name: newName });
 *   
 *   // ASSERT - Verify the results
 *   expect(result.name).toBe(newName);
 *   expect(userService.update).toHaveBeenCalledWith(userId, { name: newName });
 * });
 */

/**
 * TEST ISOLATION
 * 
 * - Each test must be independent
 * - Use beforeEach() to setup common state
 * - Use afterEach() to cleanup
 * - Don't share data between tests
 */

/**
 * MOCKING BEST PRACTICES
 * 
 * 1. Mock external dependencies only
 *    ✓ Mock database, APIs, file system
 *    ✗ Don't mock the unit under test
 * 
 * 2. Use descriptive mock names
 *    ✓ jest.spyOn(userService, 'getById').mockResolvedValue(mockUser);
 *    ✗ jest.spyOn(userService, 'getById').mockResolvedValue({ /* data */ });
 * 
 * 3. Clear mocks between tests
 *    afterEach(() => {
 *      jest.clearAllMocks();
 *    });
 */

/**
 * RUNNING TESTS
 * 
 * npm test                      # Run all tests
 * npm run test:watch            # Run tests in watch mode
 * npm run test:coverage         # Run with coverage report
 * npm run test:unit             # Run only unit tests
 * npm run test:integration      # Run only integration tests
 * npm run test:e2e              # Run only E2E tests
 * 
 * jest --testNamePattern="should calculate"  # Run specific test
 * jest --maxWorkers=1                        # Run sequentially
 */

module.exports = {
  // This file is for documentation only
};
