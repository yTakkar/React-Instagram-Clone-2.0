import React from 'react'
import { create } from 'react-test-renderer'
import SharerInfo from '../sharer-info'
import { BrowserRouter as Router } from 'react-router-dom'

describe('SharerInfo Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <SharerInfo
          sharerDetails={{
            share_by: 7,
            share_by_username: 'ghalib',
            share_to: 28,
            share_to_username: 'selena',
          }}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
