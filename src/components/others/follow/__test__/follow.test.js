import React from 'react'
import { create } from 'react-test-renderer'
import Follow from '../follow'
import { mount } from 'enzyme'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Follow Component', () => {
  const props = {
    userDetails: {
      user: 7,
      username: 'ghalib',
      firstname: 'Mirza',
      surname: 'Ghalib',
    },
    followed() {},
  }

  it('should match snapshot', () => {
    const tree = create(<Follow {...props} store={mockStore} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock follow action when clicked', () => {
    const wrapper = mount(<Follow {...props} store={mockStore} />)
    wrapper.find('PrimaryButton').simulate('click')
  })
})
