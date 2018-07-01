import React from 'react'
import { create } from 'react-test-renderer'
import AvatarActions from '../avatar-actions'
import avatarsMockArray from './avatars-mockArray'
import { shallow } from 'enzyme'

describe('Avatar-Actions Component', () => {
  const props = {
    loading: false,
    back() {},
    avatar: avatarsMockArray[0],
    of: 'user',
    group: 1,
  }

  it('should match snapshot', () => {
    const tree = create(<AvatarActions {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should perform some click events', () => {
    const wrapper = shallow(<AvatarActions {...props} />)
    const mockedEvent = {
      preventDefault() {},
    }

    wrapper.find('SecondaryButton').simulate('click', mockedEvent)
    wrapper.find('PrimaryButton').simulate('click', mockedEvent)
  })
})
