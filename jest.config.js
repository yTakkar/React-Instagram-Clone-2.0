require('dotenv').config()
const { PORT } = process.env

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setupScriptFile.js',
  testURL: `http://localhost:${PORT}`,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
