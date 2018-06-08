import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import ExploreGroups, { PureExploreGroups } from '../explore-groups'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import ExploreMockData from '../../../../store/mockStore/mock-reducers/Explore'
import { shallow } from 'enzyme'
import Explore from '../../../../store/mockStore/mock-reducers/Explore'

describe('ExpGroups Component', () => {
  const comp = (
    <Provider store={mockStore} >
      <Router>
        <ExploreGroups/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Nothing/> when groups.length == 0', () => {
    ExploreMockData.groups = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading = false', () => {
    const wrapper = shallow(
      <PureExploreGroups
        groups={Explore.groups}
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(
      wrapper.find('IsLoading').prop('loading')
    ).toEqual(false)
  })

})
