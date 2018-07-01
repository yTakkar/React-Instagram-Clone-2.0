import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import Post from '../post'
import MockPostData from '../../../../store/__mocks__/reducers/Post'

describe('Post Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Post {...MockPostData.feed[0]} when="feed" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with comments', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Post {...MockPostData.viewPost} when="viewPost" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
