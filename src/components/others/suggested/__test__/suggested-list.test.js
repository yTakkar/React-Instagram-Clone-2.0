import React from 'react'
import { create } from 'react-test-renderer'
import SuggestedList from '../suggested-list'
import { Provider } from 'react-redux'
import suggestedMockArray from './suggested-mockArray'
import { shallow } from 'enzyme'
import mockStore from '../../../../store/__mocks__/mockStore'
import mockExploreState from '../../../../store/__mocks__/reducers/Explore'

describe('Suggested-List Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <SuggestedList {...mockExploreState.suggested[0]} when="home" />
    </Provider>
  )

  it('should match snapshot with AdvancedFollow comp', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show AdvancedUnfollow comp when isFollowing state is false', () => {
    const wrapper = shallow(
      <SuggestedList {...suggestedMockArray[0]} when="home" />
    )
    wrapper.setState({ isFollowing: true })
    expect(wrapper.find('Connect(AdvancedUnfollow)').exists()).toBe(true)
  })
})
