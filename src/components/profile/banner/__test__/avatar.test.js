import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import BannerAvatar, { PureBannerAvatar } from '../avatar'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import User from '../../../../store/mockStore/mock-reducers/User'
import { shallow } from 'enzyme'

describe('BannerAvatar Component', () => {
  let dataElement

  beforeEach(() =>
    dataElement = MockDataElement()
  )

  afterEach(() =>
    dataElement.remove()
  )

  const comp = (
    <Provider store={mockStore}>
      <BannerAvatar/>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle state values when clicked on options', () => {
    const wrapper = shallow(
      <PureBannerAvatar
        ud={User.user_details}
      />
    )

    expect(wrapper.state()).toContainEntries([
      ['viewAvatar', false],
      ['changeAvatar', false]
    ])

    wrapper.find('.view_avatar_span').simulate('click')
    wrapper.find('.change_pro').simulate('click')

    expect(wrapper.state()).toContainEntries([
      ['viewAvatar', true],
      ['changeAvatar', true]
    ])
  })

})
