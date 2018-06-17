import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import BannerTags, { PureBannerTags } from '../tags'
import mockStore from '../../../../store/__mocks__/mockStore'
import { shallow } from 'enzyme'
import User from '../../../../store/__mocks__/reducers/User'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'

describe('BannerTags Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <BannerTags/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show tags when toggle icon is clicked', () => {
    const wrapper = shallow(
      <PureBannerTags
        ud={User.user_details}
        tags={User.tags}
      />
    )
    wrapper.find('.pro_exp_more').simulate('click')
    expect(wrapper.find('.tags').length).toBe(2)
  })

  it('should show no-tags message when tags.length == 0', () => {
    const wrapper = shallow(
      <PureBannerTags
        ud={User.user_details}
        tags={[]}
      />
    )
    wrapper.find('.pro_exp_more').simulate('click')
    expect(wrapper.find('.tags').length).toBe(0)
  })

  it('should show no-tags message and edit link when tags.length == 0 and user == me', () => {
    const wrapper = shallow(
      <PureBannerTags
        ud={User.user_details}
        tags={[]}
      />
    )
    wrapper.find('.pro_exp_more').simulate('click')
    expect(wrapper.find('.tags').length).toBe(0)
    expect(wrapper.find('.add_tags').exists()).toBe(true)
  })

})
