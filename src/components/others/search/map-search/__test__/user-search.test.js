import React from 'react'
import { create } from 'react-test-renderer'
import UserSearch from '../user-search'

describe('User-Search Component', () => {
  const props = {
    id: 7,
    username: 'ghalib',
    firstname: 'Mirza',
    surname: 'Ghalib',
    mutualFollowersCount: 0,
    clicked() {},
  }

  it('should match snapshot', () => {
    const tree = create(<UserSearch {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with mutual followers also hiding firstname & surname', () => {
    const tree = create(
      <UserSearch {...props} mutualFollowersCount={3} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
