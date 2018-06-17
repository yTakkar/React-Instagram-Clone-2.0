import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import MutualUsers from '../mutual-users'
import User from '../../../../store/__mocks__/reducers/User'

describe('MutualUsers Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <MutualUsers
          username='ghalib'
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when users.length == 0', () => {
    User.mutualUsers = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
