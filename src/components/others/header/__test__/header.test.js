import React from 'react'
import Header from '../header'
import { create } from 'react-test-renderer'
import { BrowserRouter as R } from 'react-router-dom'
import { mount } from 'enzyme'

describe('Header component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <R>
        <Header/>
      </R>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show options when clicked', () => {
    const wrapper = mount(
      <R><Header/></R>
    )

    expect(wrapper.find('HeaderOptions').exists()).toBeFalse()
    wrapper.find('.show_more').simulate('click')
    expect(wrapper.find('HeaderOptions').exists()).toBeTrue()
  })

})
