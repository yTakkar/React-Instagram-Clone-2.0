import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import FollowingsList, { PureFollowingsList } from '../followings-list'
import f from '../../../../../store/__mocks__/reducers/f'
import { shallow } from 'enzyme'

describe('FollowingsList Component', () => {
  MockDataElement()

  it('should match snapshot with profile link', () => {
    const tree = create(
      <Provider store={mockStore}>
        <FollowingsList {...f[0]} follow_to={24} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Follow/> when isFollowing == false', () => {
    const wrapper = shallow(<PureFollowingsList {...f[0]} />)
    wrapper.setState({ isFollowing: false })
    expect(wrapper.find('Connect(Follow)').exists()).toBe(true)
  })

  it('should show <Unfollow/> when isFollowing == true', () => {
    const wrapper = shallow(<PureFollowingsList {...f[0]} />)
    wrapper.setState({ isFollowing: true })
    expect(wrapper.find('Connect(Unfollow)').exists()).toBe(true)
  })
})
