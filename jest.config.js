module.exports = {
    preset: 'ts-jest',
    clearMocks: false,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text', 'lcov', 'clover', 'html', 'cobertura'],
    reporters: ['default', ['jest-junit', { outputName: 'coverage/junit-coverage.xml' }]]
  }
  