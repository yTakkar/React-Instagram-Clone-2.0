import React from 'react'
import { create } from 'react-test-renderer'
import MapHashtags from '../map-hashtags'
import { hashtags } from '../../../../store/__mocks__/reducers/Hashtag'

describe('MapHashtags Component', () => {
  it('should match snapshot', () => {
    const tree = create(<MapHashtags hashtags={hashtags} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
