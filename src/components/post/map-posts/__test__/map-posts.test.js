import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import MapPosts from '../map-posts'
import MockPostData from '../../../../store/__mocks__/reducers/Post'
import Post from '../../post/post'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('MapPosts Component', () => {

  const map = posts => (
    posts.map(p =>
      <Post key={p.post_id} {...p} when='feed' />
    )
  )

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <MapPosts
            posts={map(MockPostData.feed)}
            nothingMssg='No posts!!'
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when posts.length == 0', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <MapPosts
            posts={map([])}
            nothingMssg='No posts!!'
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
