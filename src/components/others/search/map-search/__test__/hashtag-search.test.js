import React from 'react'
import { create } from 'react-test-renderer'
import HashtagSearch from '../hashtag-search'

describe('Hashtag-Search Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <HashtagSearch hashtag="#travel" clicked={jest.fn()} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
