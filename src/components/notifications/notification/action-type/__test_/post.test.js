import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from 'react-test-renderer'
import NotificationTypePost from '../post'

describe('NotificationTypePost Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <NotificationTypePost
          post_id={23}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
