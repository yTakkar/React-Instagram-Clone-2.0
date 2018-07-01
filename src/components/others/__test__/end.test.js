import React from 'react'
import End from '../end'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'

describe('End Component', () => {
  it('should match snapshot', () => {
    const tree = create(<End />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should scroll the page to top when clicked', () => {
    let wrapper = shallow(<End />)
    wrapper.find('span').simulate('click')
    expect(window.pageYOffset).toEqual(0)
  })
})
