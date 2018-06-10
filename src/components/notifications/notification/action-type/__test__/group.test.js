import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from 'react-test-renderer'
import NotificationTypeGroup from '../group'

describe('NotificationTypeGroup Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <NotificationTypeGroup
          group_id={11}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
