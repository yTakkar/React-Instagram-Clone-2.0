import React from 'react'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import EditGroup, { PureEditGroup } from '../edit-s'
import { shallow } from 'enzyme'
import Group from '../../../../../store/mockStore/mock-reducers/Group'

describe('EditGroup Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <EditGroup/>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock updateGroup action when button is clicked', () => {
    const wrapper = shallow(
      <PureEditGroup
        gd={Group.group_details}
        dispatch={jest.fn()}
      />
    )
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {}
    })
  })

})
