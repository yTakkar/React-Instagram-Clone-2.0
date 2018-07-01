import React from 'react'
import AdvancedFollow from '../advancedFollow'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('AdvancedFollow Component', () => {
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
    const tree = create(
      <AdvancedFollow {...props} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock follow action when clicked', () => {
    const wrapper = mount(<AdvancedFollow {...props} store={mockStore} />)
    wrapper.find('PrimaryButton').simulate('click')
  })
})
