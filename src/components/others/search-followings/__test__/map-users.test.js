import React from 'react'
import { create } from 'react-test-renderer'
import MapSFUsers from '../map-users'
import users from './users-mockArray'
import { shallow } from 'enzyme'

describe('MapSFUsers Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot with null', () => {
    const tree = create(
      <MapSFUsers followings={[]} selectUser={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with list of 2 users', () => {
    const followings = users.slice(0, 2)
    const tree = create(
      <MapSFUsers followings={followings} selectUser={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should perform click event on the first user and return user's id & username", () => {
    const followings = users.slice(0, 2)
    let selectedUser = {}
    const wrapper = shallow(
      <MapSFUsers
        followings={followings}
        selectUser={(user, username) => (selectedUser = { user, username })}
      />
    )

    wrapper
      .find('li')
      .first()
      .simulate('click')
    expect(selectedUser).toContainEntries([['user', 7], ['username', 'ghalib']])
  })
})
