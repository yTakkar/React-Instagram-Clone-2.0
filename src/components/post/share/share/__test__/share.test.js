import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Share, { PureShare } from '../share'
import { shallow } from 'enzyme'
import mockStore from '../../../../../store/mockStore/mockStore'
import Post from '../../../../../store/mockStore/mock-reducers/Post'

describe('Share Component', () => {
  const mockFn = jest.fn()
  const props = {
    post: 44,
    postOwner: 7,
    back: mockFn,
    incrementShares: mockFn,
    decrementShares: mockFn
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Share {...props} />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureShare
        {...props}
        users={Post.usersToShare}
        dispatch={mockFn}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
