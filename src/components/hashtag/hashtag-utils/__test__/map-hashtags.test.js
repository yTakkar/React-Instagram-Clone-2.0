import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import MapHashtags from '../map-hashtags'
import { hashtags } from '../../../../store/mockStore/mock-reducers/Hashtag'

describe('MapHashtags Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <MapHashtags
          hashtags={hashtags}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
