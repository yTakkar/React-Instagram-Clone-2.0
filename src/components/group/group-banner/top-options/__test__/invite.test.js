import React from 'react'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import InviteToGroup, { PureInviteToGroup } from '../invite'
import { shallow } from 'enzyme'
import Group from '../../../../../store/mockStore/mock-reducers/Group'

describe('InviteToGroup Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <InviteToGroup/>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Invite/> when invite option is clicked', () => {
    const wrapper = shallow(
      <PureInviteToGroup
        gd={Group.group_details}
      />
    )
    wrapper.find('li > a').simulate('click', {
      preventDefault() {}
    })
    expect(wrapper.find('Connect(Invite)').exists()).toBe(true)
  })

})
