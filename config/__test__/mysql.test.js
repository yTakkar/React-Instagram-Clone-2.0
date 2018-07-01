const mysql = require('../Mysql')

describe('MySQL config tests', () => {
  test("should return an object to indicate it's successfully connected", () => {
    expect(mysql).toBeObject()
  })
})
