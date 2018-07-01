import * as util from '../utils'

describe('utils tests', () => {
  it('should shorten the string and return "This is a very lon.."', () => {
    let string = 'This is a very long string'
    expect(util.shortener(string, 20)).toEqual('This is a very lon..')
  })

  it('should return type string', () => {
    let first = util.uniq()
    let second = util.uniq()
    expect(first).not.toEqual(second)
  })

  it('should return unique random number', () => {
    let rand = util.randNum()
    let rand2 = util.randNum()
    expect(rand).not.toEqual(rand2)
  })

  it('should return results as humanReadable', () => {
    expect(util.humanReadable(0, 'like')).toEqual('No likes')
    expect(util.humanReadable(1, 'like')).toEqual('1 like')
    expect(util.humanReadable(10, 'like')).toEqual('10 likes')
  })

  it('should capitalize the string takkar', () =>
    expect(util.c_first('takkar')).toEqual('Takkar'))

  it('should return whether session id me or not', () =>
    expect(util.Me(24)).toBeBoolean())

  it("should return whether session's email is verified or not", () =>
    expect(util.e_v(24)).toBeBoolean())

  it('should return whether user is private or not', () =>
    expect(util.isPrivate(24, false, 'private')).toBeBoolean())

  it("should return messages individually even if it's an array", () => {
    let mssg1 = ['Sleep', 'eat', 'sleep again']
    let mssg2 = 'Hello'
    let mssg3 = ['Only one']
    let om = util.ObjectMssg

    expect(om(mssg1)).toEqual('Sleep')
    expect(om(mssg2)).toEqual('Hello')
    expect(om(mssg3)).toEqual('Only one')
  })
})
