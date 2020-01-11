module.exports = {
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/src/mocks'],
  coveragePathIgnorePatterns: ['<rootDir>/src/mocks'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
