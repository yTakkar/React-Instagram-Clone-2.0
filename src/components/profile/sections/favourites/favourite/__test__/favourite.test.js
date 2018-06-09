import React from 'react'
import MockDataElement from '../../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/mockStore/mockStore'
import Favourite, { PureFavourite } from '../favourite'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import Follow from '../../../../../../store/mockStore/mock-reducers/Follow'

describe('Favourite Component', () => {
  MockDataElement()

  it('should match snapshot with profile link', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Favourite
            {...Follow.favourites[0]}
            user={24}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Follow/> when isFollowing == false', () => {
    const wrapper = shallow(
      <PureFavourite
        {...Follow.favourites[0]}
        id={24}
      />
    )
    wrapper.setState({ isFollowing: false })
    expect(wrapper.find('Connect(Follow)').exists()).toBe(true)
  })

  it('should show <Unfollow/> when isFollowing == true', () => {
    const wrapper = shallow(
      <PureFavourite
        {...Follow.favourites[0]}
        id={24}
      />
    )
    wrapper.setState({ isFollowing: true })
    expect(wrapper.find('Connect(Unfollow)').exists()).toBe(true)
  })

})
