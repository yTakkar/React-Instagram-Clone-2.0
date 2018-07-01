import React from 'react'
import { create } from 'react-test-renderer'
import BannerTopOptions from '../top-options'
import { shallow } from 'enzyme'

describe('BannerTopOptions Component', () => {
  it('should match snapshot', () => {
    const tree = create(<BannerTopOptions />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show options when icon is clicked', () => {
    const wraper = shallow(<BannerTopOptions />)
    wraper.find('.pro_more_horiz').simulate('click')
    expect(wraper.find('.pro_banner_options').exists()).toBe(true)
  })
})
