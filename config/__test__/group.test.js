require('dotenv').config()

const Group = require('../Group')
const { grpID, user1 } = require('./test.config')

describe('Group config files', () => {
  test('should return type of group', async () => {
    let type = await Group.getWhatOfGrp('group_type', grpID)
    expect(type).toBeOneOf(['private', 'public'])
  })

  test('should return whether user joined group or not', async () => {
    let joined = await Group.joinedGroup(user1, grpID)
    expect(joined).toBeBoolean()
  })

  test('should return mutual members of user in a group', async () => {
    let mutuals = await Group.mutualGroupMembers(user1, grpID)
    expect(mutuals).toBeArray()
    if (mutuals.length > 0) {
      expect(mutuals).toContainEqual(
        expect.objectContaining({
          user: expect.any(Number),
          username: expect.any(String),
        })
      )
    }
  })
})
