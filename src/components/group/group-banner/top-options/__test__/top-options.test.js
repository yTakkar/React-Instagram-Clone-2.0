import React from 'react'
import { create } from 'react-test-renderer'
import GroupTopOptions from '../top-options'
import { shallow } from 'enzyme'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('GroupTopOptions Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(<GroupTopOptions />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show options when icon is clicked', () => {
    const wraper = shallow(<GroupTopOptions />)
    wraper.find('.pro_more_horiz').simulate('click')
    expect(wraper.find('.pro_banner_options').exists()).toBe(true)
  })
})
