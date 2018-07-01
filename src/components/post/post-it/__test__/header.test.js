import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import PostItHeader from '../header'
import Post from '../../../../store/__mocks__/reducers/Post'
import { create } from 'react-test-renderer'

describe('PostItHeader Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <PostItHeader />
    </Provider>
  )

  it('should match snapshot with text "Fetching location.."', () => {
    Post.postIt.fileChanged = true
    Post.postIt.fetchingLocation = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with location', () => {
    Post.postIt.fetchingLocation = false
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
