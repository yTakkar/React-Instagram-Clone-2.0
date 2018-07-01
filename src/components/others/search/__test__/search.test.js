import React from 'react'
import Search from '../search'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'
import searchData, { filterSearch } from './search-mockArray'
import { mockAxiosRequest } from '../../../../utils/__mocks__/mock-axios'

describe('Search Component', () => {
  it('should match snapshot', () => {
    const tree = create(<Search />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // mocks search functionality and returns a new wrapper as we need to mock the AJAX request multiple times in the below test
  const mockSearch = async searchTerm => {
    mockAxiosRequest('search-instagram', filterSearch(searchTerm))

    const wrapper = shallow(<Search />)
    const mockedEvent = {
      target: {
        value: searchTerm,
      },
    }

    await wrapper.find('TextInput.search').prop('valueChange')(mockedEvent)
    wrapper.instance().forceUpdate()
    return wrapper
  }

  it('should get searched data when typed in the searchbar', async () => {
    // should return only ghalib (user) as 'gh' only matches ghalib in mocked search-array
    let wrapper = await mockSearch('gh')
    expect(wrapper.state().search.users).toBeArrayOfSize(1)
    expect(wrapper.state().search.users[0]).toEqual(searchData.users[0])
    expect(wrapper.state().search.groups).toBeArrayOfSize(0)
    expect(wrapper.state().search.hashtags).toBeArrayOfSize(0)

    // should return only #travel (hashtag) as 'tr' only matches #travel in mocked search-array
    wrapper = await mockSearch('tr')
    expect(wrapper.state().search.users).toBeArrayOfSize(0)
    expect(wrapper.state().search.groups).toBeArrayOfSize(0)
    expect(wrapper.state().search.hashtags).toBeArrayOfSize(1)
    expect(wrapper.state().search.hashtags[0]).toEqual(searchData.hashtags[1])

    // should return only [] as 'nothing' matches nothing in mocked search-array
    wrapper = await mockSearch('nothing')
    expect(wrapper.state().search.users).toBeArrayOfSize(0)
    expect(wrapper.state().search.groups).toBeArrayOfSize(0)
    expect(wrapper.state().search.hashtags).toBeArrayOfSize(0)
  })
})
