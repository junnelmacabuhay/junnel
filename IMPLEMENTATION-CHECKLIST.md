# Implementation Checklist

Use this checklist to implement tests in your project systematically.

## Setup Phase ✅
- [x] Jest configured in `jest.config.js`
- [x] Test scripts added to `package.json`
- [x] Babel configured for ES6+ support
- [x] Test helpers created in `test-helpers.js`
- [x] Documentation complete

## Planning Phase
- [ ] **Feature 1: [Name]**
  - [ ] Write specification in `specs/`
  - [ ] Define acceptance criteria
  - [ ] List edge cases
  - [ ] Identify dependencies to mock

- [ ] **Feature 2: [Name]**
  - [ ] Write specification in `specs/`
  - [ ] Define acceptance criteria
  - [ ] List edge cases
  - [ ] Identify dependencies to mock

## Testing Implementation

### For Each Feature:

#### 1. Unit Tests
- [ ] Create `[module].unit.test.js`
- [ ] Test individual functions
- [ ] Mock external dependencies
- [ ] Test happy path
- [ ] Test edge cases
- [ ] Test error scenarios
- [ ] Run: `npm run test:unit`
- [ ] Verify coverage > 70%

#### 2. Integration Tests
- [ ] Create `[module].integration.test.js`
- [ ] Test service interactions
- [ ] Use test database
- [ ] Test data persistence
- [ ] Test business logic flows
- [ ] Run: `npm run test:integration`
- [ ] Verify data consistency

#### 3. E2E Tests
- [ ] Create `[feature].e2e.test.js` in `tests/e2e/`
- [ ] Test complete user workflow
- [ ] Include authentication flow
- [ ] Test error handling
- [ ] Verify UI/API integration
- [ ] Run: `npm run test:e2e`
- [ ] Test all user paths

## Quality Gates

- [ ] All tests passing: `npm test`
- [ ] Coverage report acceptable: `npm run test:coverage`
- [ ] No console errors
- [ ] No unhandled rejections
- [ ] Tests run in < 30 seconds (unit+integration)
- [ ] E2E tests run in < 5 minutes

## Best Practices Verification

- [ ] Tests are isolated (no shared state)
- [ ] Tests follow AAA pattern
- [ ] Test names are descriptive
- [ ] No skipped tests (`xit`, `xtest`, `skip`)
- [ ] Mocks are cleaned up between tests
- [ ] Tests don't test implementation details
- [ ] Error cases are tested
- [ ] Edge cases are covered

## Documentation

- [ ] Feature specifications completed
- [ ] API documentation updated
- [ ] Test scenarios documented
- [ ] Setup instructions clear
- [ ] Troubleshooting guide helpful

## Continuous Integration

- [ ] CI/CD pipeline tests on commit
- [ ] Coverage reports tracked
- [ ] Build fails if tests fail
- [ ] Coverage thresholds enforced

## Monitoring & Maintenance

- [ ] Flaky tests identified and fixed
- [ ] Test performance monitored
- [ ] New tests added with new features
- [ ] Old/unused tests removed
- [ ] Mocks kept current with dependencies

---

## Quick Commands Reference

```bash
# Development
npm test                    # Run all tests
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report

# By Type
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e           # E2E tests only

# Specific Tests
npm test -- user.unit.test.js                 # Specific file
npm test -- --testNamePattern="should"        # Match pattern
npm test -- --maxWorkers=1                    # Sequential

# Coverage
npm run test:coverage
open coverage/lcov-report/index.html           # View report
```

## Template Files to Use

When creating a new test, start with these templates:

| Test Type | Template File | Location |
|-----------|---------------|----------|
| Unit | `unit-test.template.js` | Root directory |
| Integration | `integration-test.template.js` | Root directory |
| E2E | `e2e-test.template.js` | Root directory |
| Spec | `api-endpoint.spec.js` | `specs/` directory |
| Spec | `function.spec.js` | `specs/` directory |

---

## Feature Template

Copy this for each feature you're testing:

```markdown
### Feature: [Feature Name]

**Spec File**: `specs/[feature-name].spec.js`
- [ ] Specification written

**Unit Tests**: `src/[module]/[module].unit.test.js`
- [ ] Happy path tests
- [ ] Error handling
- [ ] Edge cases

**Integration Tests**: `src/[module]/[module].integration.test.js`
- [ ] Service interactions
- [ ] Data persistence
- [ ] Business logic

**E2E Tests**: `tests/e2e/[feature-name].e2e.test.js`
- [ ] Complete workflow
- [ ] Error scenarios
- [ ] User journey

**Status**: [ ] In Progress / [ ] Complete
```

---

**Remember**: Test early, test often, and test thoroughly! 🎯
