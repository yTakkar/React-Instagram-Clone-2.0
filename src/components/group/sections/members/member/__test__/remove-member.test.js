import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import RemoveMember, { PureRemoveMember } from '../remove-member'
import { shallow } from 'enzyme'
import Group from '../../../../../../store/__mocks__/reducers/Group'

describe('RemoveMember Component', () => {
  const memberDetails = {
    grp_member_id: 45,
    member: 7,
    username: 'ghalib',
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <RemoveMember memberDetails={memberDetails} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when button is clicked and mock removeMember action', () => {
    const wrapper = shallow(
      <PureRemoveMember
        memberDetails={memberDetails}
        gd={Group.group_details}
      />
    )
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
