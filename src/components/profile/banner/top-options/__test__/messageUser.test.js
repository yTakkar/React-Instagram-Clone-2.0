import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import Follow from '../../../../../store/__mocks__/reducers/Follow'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerMessageUser, { PureBannerMessageUser } from '../messageUser'
import User from '../../../../../store/__mocks__/reducers/User'
import { shallow } from 'enzyme'

describe('BannerMessageUser Component', () => {
  const mockFn = jest.fn()
  MockDataElement()

  it('should match snapshot', () => {
    Follow.isFollowing = true
    User.user_details.id = 7
    const tree = create(
      <Provider store={mockStore}>
        <BannerMessageUser toggleOptions={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock messageUser action and redirect to /messages when messaged', () => {
    const wrapper = shallow(
      <PureBannerMessageUser
        toggleOptions={mockFn}
        ud={{
          ...User.user_details,
          id: 7,
        }}
        isFollowing
      />
    )
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })

    // should redirect
    wrapper.setState({ messagedUser: true })
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })
})
