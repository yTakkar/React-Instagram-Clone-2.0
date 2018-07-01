import React from 'react'
import { create } from 'react-test-renderer'
import HashtagHeader from '../hashtag-header'

describe('HashtagHeader Component', () => {
  it('should match snapshot', () => {
    const tree = create(<HashtagHeader text="Popular trends" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
