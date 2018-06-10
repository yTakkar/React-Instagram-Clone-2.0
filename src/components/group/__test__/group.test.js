import React from 'react'
import MockDataElement from '../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Group, { PureGroup } from '../group'
import { shallow } from 'enzyme'
import GroupMockData from '../../../store/mockStore/mock-reducers/Group'

describe('Group Component', () => {
  MockDataElement()

  const props = {
    match: {
      params: { grp_id: '11' },
      url: '/group/11'
    }
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Group {...props} />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureGroup
        {...props}
        gd={GroupMockData.group_details}
        joined
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
