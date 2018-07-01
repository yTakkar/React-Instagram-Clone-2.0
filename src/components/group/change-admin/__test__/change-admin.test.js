import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import ChangeAdmin, { PureChangeAdmin } from '../change-admin'
import { shallow } from 'enzyme'
import Group from '../../../../store/__mocks__/reducers/Group'

describe('ChangeAdmin Component', () => {
  const mockFn = jest.fn()
  const props = {
    group: 11,
    back: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ChangeAdmin {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <PureChangeAdmin
        {...props}
        members={Group.usersToMakeAdmin}
        dispatch={mockFn}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
