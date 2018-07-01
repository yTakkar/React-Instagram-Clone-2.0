import React from 'react'
import { create } from 'react-test-renderer'
import ViewAvatarAction from '../view-avatar'
import mockStore from '../../../../../store/__mocks__/mockStore'

describe('ViewAvatar-Action Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot with null', () => {
    const tree = create(
      <ViewAvatarAction
        view={false}
        when="user"
        back={mockFn}
        store={mockStore}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with ViewAvatar Component', () => {
    const tree = create(
      <ViewAvatarAction view when="user" back={mockFn} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
