import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from 'react-test-renderer'
import NotificationTypeCon from '../conversation'

describe('NotificationTypeCon Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <NotificationTypeCon/>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
