/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.interface.ts",
    "!src/index.ts"
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  },
  moduleNameMapper: {
    '@domain/(.*)': ['<rootDir>/src/domain/$1'],
    '@application/(.*)': ['<rootDir>/src/application/$1'],
    '@infrastructure/(.*)': ['<rootDir>/src/infrastructure/$1'],
  },
  preset: 'ts-jest',
  rootDir: '.'
};

export default config;
