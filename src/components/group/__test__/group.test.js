import React from 'react'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Group, { PureGroup } from '../group'
import { shallow } from 'enzyme'
import GroupMockData from '../../../store/__mocks__/reducers/Group'
import { MemoryRouter } from 'react-router-dom'

jest.unmock('react-router-dom')

describe('Group Component', () => {
  MockDataElement()

  const props = {
    match: {
      params: { grp_id: '11' },
      url: '/group/11',
    },
  }

  it('should match snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Group {...props} />
        </Provider>
      </MemoryRouter>
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
