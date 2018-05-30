import React from 'react'
import { create } from 'react-test-renderer'
import UserSearch from '../user-search'
import { BrowserRouter as Router } from 'react-router-dom'

describe('User-Search Component', () => {
  const props = {
    id: 7,
    username: 'ghalib',
    firstname: 'Mirza',
    surname: 'Ghalib',
    mutualFollowersCount: 0,
    clicked() {}
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <UserSearch
          {...props}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with mutual followers also hiding firstname & surname', () => {
    const tree = create(
      <Router>
        <UserSearch
          {...props}
          mutualFollowersCount={3}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })


})
