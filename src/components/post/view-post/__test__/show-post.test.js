import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import ShowPost from '../show-post'
import Post from '../../../../store/__mocks__/reducers/Post'

describe('ShowPost Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <ShowPost />
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
