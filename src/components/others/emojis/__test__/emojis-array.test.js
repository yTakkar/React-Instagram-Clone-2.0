import EmojisArray from '../emojis-array'
import { create } from 'react-test-renderer'

describe('Emojis Array', () => {
  it('should match snapshot', () => {
    const tree = create(EmojisArray).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should contain 😈, 😺, 😎', () => {
    expect(EmojisArray).toIncludeAnyMembers(['😈', '😺', '😎'])
  })
})
