import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import PostBookmark, { PurePostBookmark } from '../post-bookmark'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'
import User from '../../../../store/__mocks__/reducers/User'

describe('PostBookmark Component', () => {
  const props = {
    postDetails: {
      post_id: 13,
      when: 'bookmark',
    },
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostBookmark {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show bookmark icon and mock bookmark action when bookmarked == false', () => {
    const wrapper = shallow(
      <PurePostBookmark {...props} ud={User.user_details} />
    )
    wrapper.setState({ bookmarked: false })
    expect(wrapper.find('.p_bookmark').exists()).toBe(true)
    wrapper.find('.p_bookmark').simulate('click')
  })

  it('should show unbookmark icon and mock unbookmark action when bookmarked == true', () => {
    const wrapper = shallow(
      <PurePostBookmark {...props} ud={User.user_details} />
    )
    wrapper.setState({ bookmarked: true })
    expect(wrapper.find('.undo_bookmark').exists()).toBe(true)
    wrapper.find('.undo_bookmark').simulate('click')
  })
})
