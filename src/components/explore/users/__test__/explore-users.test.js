import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import ExploreUsers, { PureExploreUsers } from '../explore-users'
import mockStore from '../../../../store/__mocks__/mockStore'
import ExploreMockData from '../../../../store/__mocks__/reducers/Explore'
import { shallow } from 'enzyme'
import Explore from '../../../../store/__mocks__/reducers/Explore'

describe('ExpUsers Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <ExploreUsers />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Nothing/> when users.length == 0', () => {
    ExploreMockData.users = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading = false', () => {
    const wrapper = shallow(
      <PureExploreUsers users={Explore.users} dispatch={jest.fn()} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
