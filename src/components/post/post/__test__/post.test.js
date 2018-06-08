import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Post from '../post'
import MockPostData from '../../../../store/mockStore/mock-reducers/Post'

describe('Post Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Post
            {...MockPostData.feed[0]}
            when='feed'
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with comments', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Post
            {...MockPostData.viewPost}
            when='viewPost'
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
