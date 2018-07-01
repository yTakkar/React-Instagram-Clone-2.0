import React from 'react'
import AdvancedUnfollow from '../advancedUnfollow'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('AdvancedUnfollow Component', () => {
  const props = {
    user: 7,
    unfollowed() {},
  }

  it('should match snapshot', () => {
    const tree = create(
      <AdvancedUnfollow {...props} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock unfollow action when clicked', () => {
    const wrapper = mount(<AdvancedUnfollow {...props} store={mockStore} />)
    wrapper.find('PrimaryButton').simulate('click')
  })
})
