require('dotenv').config()

const Message = require('../Message')
const { conId } = require('./test.config')

describe('Message config tests', () => {
  test('should return last message time', async () => {
    let lastMssgTime = await Message.getLastMssgTime(conId)
    expect(typeof lastMssgTime).toBeOneOf(['string', 'object']) // typeof null = object
  })

  test('should return last message', async () => {
    let lastMssg = await Message.getLastMssg(conId)
    expect(typeof lastMssg).toBeOneOf(['object', 'undefined'])
  })

  test('should return last message with specified keys & values', async () => {
    let lastMssg = await Message.getLastMssg(conId)
    if (typeof lastMssg !== 'undefined') {
      expect(lastMssg).toBeObject()
      expect.objectContaining({
        message: expect.any(String),
        type: expect.any(String),
        mssg_by: expect.any(Number),
      })
    }
  })
})
