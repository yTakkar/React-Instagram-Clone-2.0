import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import BannerAvatar, { PureBannerAvatar } from '../avatar'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'
import User from '../../../../store/__mocks__/reducers/User'
import { shallow } from 'enzyme'

describe('BannerAvatar Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerAvatar />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle state values when clicked on options', () => {
    const wrapper = shallow(<PureBannerAvatar ud={User.user_details} />)

    expect(wrapper.state()).toContainEntries([
      ['viewAvatar', false],
      ['changeAvatar', false],
    ])

    wrapper.find('.view_avatar_span').simulate('click')
    wrapper.find('.change_pro').simulate('click')

    expect(wrapper.state()).toContainEntries([
      ['viewAvatar', true],
      ['changeAvatar', true],
    ])
  })
})
