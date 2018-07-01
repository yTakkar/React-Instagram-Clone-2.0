import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Comments from '../comments'
import Post from '../../../../../store/__mocks__/reducers/Post'

describe('Comments Component', () => {
  const props = {
    when: 'viewPost',
    comments: Post.viewPost.comments,
    decrementComments: jest.fn(),
  }

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <Comments {...props} {...extraProps} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when comments.length == 0', () => {
    const tree = create(
      comp({
        comments: [],
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when null when prop.when != viewPost', () => {
    const tree = create(
      comp({
        when: 'feed',
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
