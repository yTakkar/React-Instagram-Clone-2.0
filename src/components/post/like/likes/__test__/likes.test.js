import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Likes, { PureLikes } from '../likes'
import { shallow } from 'enzyme'
import Post from '../../../../../store/__mocks__/reducers/Post'

describe('Likes Component', () => {
  const mockFn = jest.fn()
  const props = {
    post: 44,
    back: mockFn,
    decrementLikes: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Likes {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show spinner when loading == false', () => {
    const wrapper = shallow(
      <PureLikes {...props} likes={Post.likes} dispatch={mockFn} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
