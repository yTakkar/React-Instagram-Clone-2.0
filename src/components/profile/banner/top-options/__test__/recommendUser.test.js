import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerRecommendUser, { PureBannerRecommendUser } from '../recommendUser'
import User from '../../../../../store/__mocks__/reducers/User'
import { shallow } from 'enzyme'

describe('BannerRecommendUser Component', () => {
  const mockFn = jest.fn()
  MockDataElement()

  it('should match snapshot', () => {
    User.user_details.id = 7
    const tree = create(
      <Provider store={mockStore}>
        <BannerRecommendUser toggleOptions={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <RecommendUsers/> when clicked on recommend option', () => {
    const wrapper = shallow(
      <PureBannerRecommendUser toggleOptions={mockFn} id={7} />
    )
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })

    expect(wrapper.find('Connect(RecommendUsers)').exists()).toBe(true)
  })
})
