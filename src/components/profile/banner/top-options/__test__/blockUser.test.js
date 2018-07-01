import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import BannerBlockUser, { PureBannerBlockUser } from '../blockUser'
import { shallow } from 'enzyme'
import User from '../../../../../store/__mocks__/reducers/User'

describe('BannerBlockUser Component', () => {
  MockDataElement()
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    User.user_details.id = 7
    const tree = create(
      <Provider store={mockStore}>
        <BannerBlockUser toggleOptions={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> and mock block option when block option is clicked', () => {
    const wrapper = shallow(
      <PureBannerBlockUser
        ud={{
          ...User.user_details,
          id: 7,
        }}
        toggleOptions={mockFn}
      />
    )
    wrapper.find('.pro_block').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
