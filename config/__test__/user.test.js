require('dotenv').config()

const User = require('../User')
const bcrypt = require('bcrypt-nodejs')
const db = require('../db')
const { user1, user2 } = require('./test.config')
let createdUser = {}

describe('User config tests', () => {
  // delete the created user when all the tests are complete
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE id=?', [createdUser.id])
    createdUser = {}
  })

  test('should create a new user', async () => {
    let newUser = await User.create_user({
      username: 'testuser',
      firstname: 'testfirstname',
      surname: 'testsurname',
      email: 'testemail@gmail.com',
      password: 'testPassword',
      joined: new Date().getTime(),
      email_verified: 'no',
      isOnline: 'yes',
    })
    expect(newUser).toBeObject()
    expect(newUser).toContainKeys(['insertId', 'affectedRows'])
    createdUser = {
      id: newUser.insertId,
      hashPassword: bcrypt.hashSync('testPassword'),
    }
  })

  test('should change the password', async () => {
    let changedPassword = await User.change_password({
      password: 'testPasswordChanged',
      id: createdUser.id,
    })
    expect(changedPassword).toBeBoolean()
    expect(changedPassword).toBe(true)
  })

  test('should compare the password and return true', async () => {
    let compare1 = User.comparePassword(
      'testPasswordChanged',
      createdUser.hashPassword
    )
    let compare2 = User.comparePassword(
      'testPassword',
      createdUser.hashPassword
    )
    let compare3 = User.comparePassword(
      'testPasswordChanged',
      bcrypt.hashSync('testPasswordChanged')
    )
    expect(compare1).toBe(false)
    expect(compare2).toBe(true)
    expect(compare3).toBe(true)
  })

  test('should return whether user1 is following user2 or not', async () => {
    let isF = await User.isFollowing(user1, user2)
    expect(isF).toBeBoolean()
  })

  test("should return whether user1 is user2's favourite or not", async () => {
    let isFav = await User.favouriteOrNot(user2, user1)
    expect(isFav).toBeBoolean()
  })

  test('should return whether user1 is blocked by user2 or not', async () => {
    let isB = await User.isBlocked(user1, user2)
    expect(isB).toBeBoolean()
  })

  test('should return mutual users of user1 & user2', async () => {
    let mutuals = await User.mutualUsers(user1, user2)
    expect(mutuals).toBeArray()
    if (mutuals.length > 0) {
      expect(mutuals).toContainEqual(
        expect.objectContaining({
          follow_id: expect.any(Number),
          user: expect.any(Number),
          username: expect.any(String),
          firstname: expect.any(String),
          surname: expect.any(String),
        })
      )
    }
  })

  test('should return ID of ghalib', async () => {
    let id = await User.getId('ghalib')
    expect(id).toBeNumber()
    expect(id).toBe(user2)
  })

  test('should return firstname & surname of ID 24', async () => {
    let firstname = await User.getWhat('firstname', user1)
    let surname = await User.getWhat('surname', user1)
    expect(firstname).toBeString()
    expect(surname).toBeString()
    expect(firstname).toEqual('iam_')
    expect(surname).toEqual('takkar')
  })
})
