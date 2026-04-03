import '@testing-library/jest-dom';

// Mock API responses
global.fetch = jest.fn();

// Setup test utilities
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});
