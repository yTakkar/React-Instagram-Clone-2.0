import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import AddTags from '../add-tags'
import Post from '../../../../store/__mocks__/reducers/Post'

describe('AddTags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <AddTags />
    </Provider>
  )

  it('should match snapshot with tags', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when tags.length == 0', () => {
    Post.postIt.tags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <SearchFollowing/> when addTag == true', () => {
    Post.postIt.addTag = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
