import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import DeleteGroup, { PureDeleteGroup } from '../deleteGroup'
import { shallow } from 'enzyme'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('DeleteGroup Component', () => {
  const mockFn = jest.fn()
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <DeleteGroup toggleOptions={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when delete option is clicked and mock deleteGrp action', () => {
    const wrapper = shallow(
      <PureDeleteGroup gd={Group.group_details} toggleOptions={mockFn} />
    )
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
