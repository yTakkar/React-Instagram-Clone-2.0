import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Comment from '../comment'
import Post from '../../../../../store/__mocks__/reducers/Post'

describe('Comment Component', () => {
  const comp = (index = 0) => (
    <Provider store={mockStore}>
      <Comment
        {...Post.viewPost.comments[index]}
        decrementComments={jest.fn()}
      />
    </Provider>
  )

  it('should match snapshot with type text', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type image', () => {
    const tree = create(comp(1)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type sticker', () => {
    const tree = create(comp(2)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
