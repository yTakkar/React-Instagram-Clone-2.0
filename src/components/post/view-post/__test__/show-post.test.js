import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import ShowPost from '../show-post'
import { BrowserRouter as Router } from 'react-router-dom'
import Post from '../../../../store/mockStore/mock-reducers/Post'

describe('ShowPost Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <ShowPost/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when no post', () => {
    Post.viewPost = {}
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
