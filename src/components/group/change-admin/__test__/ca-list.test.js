import React from 'react'
import Group from '../../../../store/__mocks__/reducers/Group'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import ChangeAdminList from '../ca-list'
import { shallow } from 'enzyme'

describe('ChangeAdminList Component', () => {
  const props = {
    ...Group.usersToMakeAdmin[0],
    group: 11,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ChangeAdminList {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on transfer button', () => {
    const wrapper = shallow(<ChangeAdminList {...props} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it('should mock transfer action', () => {
    const wrapper = shallow(<ChangeAdminList {...props} />)
    wrapper.setState({ change: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
