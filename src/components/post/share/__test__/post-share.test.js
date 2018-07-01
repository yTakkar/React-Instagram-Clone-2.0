import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import PostShare from '../post-share'
import { shallow } from 'enzyme'

describe('PostShare Component', () => {
  const mockFn = jest.fn()
  const props = {
    postDetails: {
      post_id: 44,
      user: 7,
    },
    incrementWhat: mockFn,
    decrementWhat: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostShare {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Share/> when showShare == true', () => {
    const wrapper = shallow(<PostShare {...props} />)
    wrapper.setState({ showShare: true })
    expect(wrapper.find('Connect(Share)').exists()).toBe(true)
  })
})
