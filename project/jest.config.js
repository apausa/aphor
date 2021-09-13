/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/*.config.js',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: { '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }] },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
    'jest.config.js',
    'next.config.js',
  ],
  moduleNameMapper: { '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy' },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
