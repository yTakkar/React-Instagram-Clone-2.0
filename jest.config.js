require('dotenv').config()
const { PORT } = process.env

module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  setupTestFrameworkScriptFile: 'jest-extended',
  testURL: `http://localhost:${PORT}`
}
