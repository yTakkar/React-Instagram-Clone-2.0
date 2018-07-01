import React from 'react'
import Header from '../header'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'

describe('Header component', () => {
  const comp = <Header />

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show options when clicked', () => {
    const wrapper = mount(comp)

    expect(wrapper.find('HeaderOptions').exists()).toBeFalse()
    wrapper.find('.show_more').simulate('click')
    expect(wrapper.find('HeaderOptions').exists()).toBeTrue()
  })
})
