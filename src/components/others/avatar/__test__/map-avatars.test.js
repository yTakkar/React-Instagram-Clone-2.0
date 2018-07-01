import React from 'react'
import { create } from 'react-test-renderer'
import MapAvatars from '../map-avatars'
import avatars from './avatars-mockArray'
import { shallow } from 'enzyme'

describe('Map-Avatars Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot with Spinner', () => {
    const tree = create(
      <MapAvatars avatars={[]} loading selectAvatar={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show avatars list', () => {
    const tree = create(
      <MapAvatars loading={false} avatars={avatars} selectAvatar={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should return file path of the selected avatar when clicked', () => {
    let selectedAvatar = ''
    const wrapper = shallow(
      <MapAvatars
        loading={false}
        avatars={avatars}
        selectAvatar={avatar => (selectedAvatar = avatar)}
      />
    )

    // when clicked on the first avatar
    wrapper
      .find('.pro_ava_avts')
      .first()
      .simulate('click')
    expect(selectedAvatar).toEqual(avatars[0])

    // when clicked on the third avatar
    wrapper
      .find('.pro_ava_avts')
      .at(2)
      .simulate('click')
    expect(selectedAvatar).toEqual(avatars[2])
  })
})
