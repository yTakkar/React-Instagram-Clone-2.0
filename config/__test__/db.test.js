require('dotenv').config()

const db = require('../db')
const { user1 } = require('./test.config')

describe('db file tests', () => {
  test('should return username, email of ID 24', async () => {
    let query = await db.query('SELECT username, email FROM users WHERE id=?', [
      user1,
    ])
    expect(query[0]).toBeObject()
    expect(query[0]).toContainEntries([
      ['email', 'takkar@gmail.com'],
      ['username', 'takkar'],
    ])
  })

  test('should return boolean', () => {
    expect(db.tf(1)).toEqual(true)
  })
})
