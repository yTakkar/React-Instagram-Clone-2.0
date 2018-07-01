import React from 'react'
import { create } from 'react-test-renderer'
import Emojis from '../emojis'

describe('Emojis component', () => {
  const props = {
    position: {
      top: 10,
      left: 40,
    },
    textArea: '#testing-textarea',
    updateStateValue() {},
  }

  it('should match snapshot of Emojis Component', () => {
    const tree = create(<Emojis {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
