import EmojisArray from '../emojis-array'

describe('Emojis Array', () => {

  it('should be an array of 768 emojis', () => {
    expect(EmojisArray).toBeArray()
    expect(EmojisArray.length).toBe(768)
  })

  it('should contain 😈, 😺, 😎', () => {
    expect(EmojisArray).toIncludeAnyMembers(
      [ '😈', '😺', '😎' ]
    )
  })

})
