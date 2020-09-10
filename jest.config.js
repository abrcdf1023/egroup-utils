module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePathIgnorePatterns: ['build', 'node_modules']
};
