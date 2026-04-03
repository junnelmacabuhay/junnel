module.exports = {
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js', '<rootDir>/src/**/*.test.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/components/**/__tests__/**/*.test.js', '<rootDir>/src/components/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    },
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
