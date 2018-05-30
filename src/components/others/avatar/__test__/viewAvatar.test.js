import React from 'react'
import { create } from 'react-test-renderer'
import ViewAvatar from '../viewAvatar'
import { shallow } from 'enzyme'

describe('ViewAvatar Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <ViewAvatar/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  const changeRange = (wrapper, value) => {
    let mockedEvent = {
      target: { value }
    }
    wrapper.find('RangeInput').simulate('change', mockedEvent)
  }

  it('should change img\'s width based on state', () => {
    const wrapper = shallow(<ViewAvatar/>)

    // image's width should be 300 when range=300
    changeRange(wrapper, 300)
    expect(wrapper.find('img').prop('style').width).toBe('300px')

    // image's width should be 400 when range=400
    changeRange(wrapper, 400)
    expect(wrapper.find('img').prop('style').width).toBe('400px')
  })

})
