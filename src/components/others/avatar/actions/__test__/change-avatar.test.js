import React from 'react'
import ChangeAvatarAction from '../change-avatar'
import { create } from 'react-test-renderer'
import mockStore from '../../../../../store/__mocks__/mockStore'

describe('ChangeAvatar-Action Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot with null', () => {
    const tree = create(
      <ChangeAvatarAction
        store={mockStore}
        change={false}
        when="group"
        back={mockFn}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with Avatars Component', () => {
    const tree = create(
      <ChangeAvatarAction change when="user" back={mockFn} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
