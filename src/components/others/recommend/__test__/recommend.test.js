import React from 'react'
import { create } from 'react-test-renderer'
import Recommend from '../recommend'
import { shallow } from 'enzyme'

describe('Recommend Component', () => {
  const comp = <Recommend username="ghalib" />

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle RecommendUsers modal when clicked on the button', () => {
    const wrapper = shallow(comp)
    wrapper.find('SecondaryButton').simulate('click', { preventDefault() {} })

    expect(wrapper.state().recommend).toBe(true)
    expect(wrapper.find('Connect(RecommendUsers)').exists()).toBe(true)
  })
})
