import React from 'react'
import End from '../end'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('End Component', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<End/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should scroll the page to top when clicked', () => {
    let wrapper = shallow(<End/>)
    wrapper.find('span').simulate('click')
    expect(window.pageYOffset).toEqual(0)
  })

})
