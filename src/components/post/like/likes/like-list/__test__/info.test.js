import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import LikeInfo from '../info'

describe('LikeInfo Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <LikeInfo
          likeDetails={{
            like_by: 7,
            username: 'ghalib',
            like_time: '1516528068337'
          }}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
