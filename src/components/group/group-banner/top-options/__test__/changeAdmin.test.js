import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import ChangeGroupAdmin, { PureChangeGroupAdmin } from '../changeAdmin'
import { shallow } from 'enzyme'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('ChangeGroupAdmin Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ChangeGroupAdmin />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <ChangeAdmin/> when change option is clicked', () => {
    const wrapper = shallow(<PureChangeGroupAdmin gd={Group.group_details} />)
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Connect(ChangeAdmin)').exists()).toBe(true)
  })
})
