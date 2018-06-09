import React from 'react'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import PeopleYouKnowList, { PurePeopleYouKnowList } from '../puk-list'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'

describe('PeopleYouKnowList Component', () => {
  MockDataElement()

  it('should match snapshot with profile link', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <PeopleYouKnowList
            {...User.mutualUsers[0]}
            user={24}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Follow/> when isFollowing == false', () => {
    const wrapper = shallow(
      <PurePeopleYouKnowList
        {...User.mutualUsers[0]}
      />
    )
    wrapper.setState({ isFollowing: false })
    expect(wrapper.find('Connect(Follow)').exists()).toBe(true)
  })

  it('should show <Unfollow/> when isFollowing == true', () => {
    const wrapper = shallow(
      <PurePeopleYouKnowList
        {...User.mutualUsers[0]}
      />
    )
    wrapper.setState({ isFollowing: true })
    expect(wrapper.find('Connect(Unfollow)').exists()).toBe(true)
  })

})
