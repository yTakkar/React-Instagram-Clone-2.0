import React from 'react'
import { create } from 'react-test-renderer'
import SearchFollowings from '../search-followings'
import { shallow, mount } from 'enzyme'
import { mockAxiosRequest } from '../../../../utils/__mocks__/mock-axios'
import usersMockArray from './users-mockArray'

describe('Search-Followings Component', () => {
  const mockFn = jest.fn()
  const comp = <SearchFollowings when="new_con" done={mockFn} />

  mockAxiosRequest('search-followings', usersMockArray)

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should get users from API on componentDidMount', async () => {
    const wrapper = shallow(comp)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().data).toBeArray()
    expect(wrapper.state().data[0]).toContainKeys([
      'follow_to',
      'follow_to_username',
    ])
  })

  const simulateChange = (wrapper, value) => {
    wrapper.find('input').simulate('change', { target: { value } })
  }

  it('should return matched users when typing', async () => {
    const wrapper = mount(comp)
    await wrapper.instance().componentDidMount()

    // should return coldplay as 'cold' matches only coldplay
    simulateChange(wrapper, 'cold')
    expect(wrapper.state().followings).toBeArrayOfSize(1)
    expect(wrapper.state().followings[0]).toContainEntries([
      ['follow_to', 8],
      ['follow_to_username', 'coldplay'],
    ])

    // should return ghalib as 'gh' matches ghalib only
    simulateChange(wrapper, 'gh')
    expect(wrapper.state().followings).toBeArrayOfSize(1)
    expect(wrapper.state().followings[0]).toContainEntries([
      ['follow_to', 7],
      ['follow_to_username', 'ghalib'],
    ])

    // should return [] as 'very-diff' matches neither ghalib nor coldplay
    simulateChange(wrapper, 'very-diff')
    expect(wrapper.state().followings).toBeArrayOfSize(0)
  })
})
