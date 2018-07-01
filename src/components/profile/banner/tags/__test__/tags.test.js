import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import BannerTags from '../tags'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import mockStore from '../../../../../store/__mocks__/mockStore'
import { shallow } from 'enzyme'

describe('BannerTags Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <BannerTags />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show tags when toggle icon is clicked', () => {
    const wrapper = shallow(<BannerTags />)
    wrapper.find('.pro_exp_more').simulate('click')
    expect(wrapper.find('.pro_tags').exists()).toBe(true)
  })
})
