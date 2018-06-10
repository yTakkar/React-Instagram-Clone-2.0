import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from 'react-test-renderer'
import NotificationTypeProfile from '../profile'

describe('NotificationTypeProfile Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <NotificationTypeProfile
          user_username='ghalib'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
