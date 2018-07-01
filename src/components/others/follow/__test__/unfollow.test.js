import React from 'react'
import { create } from 'react-test-renderer'
import Unfollow from '../unfollow'
import { mount } from 'enzyme'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Unfollow Component', () => {
  const props = {
    user: 7,
    unfollowed() {},
  }

  it('should match snapshot', () => {
    const tree = create(<Unfollow {...props} store={mockStore} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock unfollow action when clicked', () => {
    const wrapper = mount(<Unfollow {...props} store={mockStore} />)
    wrapper.find('PrimaryButton').simulate('click')
  })
})
