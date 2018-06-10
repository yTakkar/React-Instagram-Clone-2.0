import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import GroupAvatar, { PureGroupAvatar } from '../avatar'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import Group from '../../../../store/mockStore/mock-reducers/Group'

describe('GroupAvatar Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <GroupAvatar/>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle state values when clicked on options', () => {
    const wrapper = shallow(
      <PureGroupAvatar
        gd={Group.group_details}
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
