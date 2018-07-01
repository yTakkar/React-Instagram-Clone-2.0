require('dotenv').config()

const mailConfig = require('../Mail')
const { testMailTo } = require('./test.config')

describe('Mail config test', () => {
  test('should mail to given email address', async () => {
    let options = {
      to: testMailTo,
      subject: 'Test mail',
      html: "<h1>HELLO TAKKAR, it's a test mail!!</h1>",
    }
    let mail = await mailConfig(options)
    expect(mail).toBeString()
    expect(mail).toEqual('Mail Sent!!')
  })
})
