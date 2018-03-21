/* eslint no-undef:0 */

import * as util from '../utils'

describe('utils tests', () => {

  it('shortener() should return "This is a very lon.."', () => {
    let string = 'This is a very long string'
    expect(util.shortener(string, 20)).toEqual('This is a very lon..')
  })

  it('uniq() should return type string', () =>
    expect(typeof util.uniq()).toBe('string')
  )

  it('humanReadable() should return below results', () => {
    expect(util.humanReadable(0, 'like')).toEqual('No likes')
    expect(util.humanReadable(1, 'like')).toEqual('1 like')
    expect(util.humanReadable(10, 'like')).toEqual('10 likes')
  })

  it('c_first("takkar") should return "Takkar"', () =>
    expect(util.c_first('takkar')).toEqual('Takkar')
  )

  it('Me(24) should return type boolean', () =>
    expect(typeof util.Me(24)).toBe('boolean')
  )

  it('e_v(24) should return type boolean', () =>
    expect(typeof util.e_v(24)).toBe('boolean')
  )

  it('isPrivate(24, false, "private") should return type boolean', () =>
    expect(typeof util.isPrivate(24, false, 'private')).toBe('boolean')
  )

})
