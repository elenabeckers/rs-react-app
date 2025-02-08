import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: '@bufbuild/jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json'],
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/node_modules/**',
    '!**/*.test.tsx',
    '!**/*.spec.tsx',
    '!src/__tests__/setup.ts',
    '!src/App.tsx',
    '!src/main.tsx',
  ],
};

export default config;
