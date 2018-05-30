require('dotenv').config()
const { PORT } = process.env

module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  testURL: `http://localhost:${PORT}`
}
