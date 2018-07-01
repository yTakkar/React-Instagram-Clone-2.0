import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import CommentOptions, { PureCommentTools } from '../comment-options'
import { shallow } from 'enzyme'

describe('CommentOptions Component', () => {
  let dataElement
  const mockFn = jest.fn()

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const commentDetails = {
    comment_id: 4,
    comment_by: 7,
    type: 'text',
    text: 'some comment',
    commentSrc: 'instagram_comment_1518972851259.jpg',
  }

  const comp = (extraDetails = {}) => (
    <Provider store={mockStore}>
      <CommentOptions
        commentDetails={{
          ...commentDetails,
          ...extraDetails,
        }}
        decrementComments={mockFn}
        updateCommentText={mockFn}
      />
    </Provider>
  )

  it('should match snapshot with null', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show toggle icon', () => {
    // when comment is mine
    const tree = create(
      comp({
        comment_by: 24,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()

    // when iam the admin
    dataElement.setAttribute('data-isadmin', 'true')
    const tree2 = create(comp()).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  it('should show options', () => {
    const wrapper = shallow(
      <PureCommentTools
        commentDetails={{
          ...commentDetails,
          comment_by: 24,
        }}
        decrementComments={mockFn}
        updateCommentText={mockFn}
      />
    )

    wrapper.find('.toggle_options').simulate('click')
    expect(wrapper.find('.comments_options').exists()).toBe(true)
  })

  it('should not show options', () => {
    const wrapper = shallow(
      <PureCommentTools
        commentDetails={commentDetails}
        decrementComments={mockFn}
        updateCommentText={mockFn}
      />
    )
    expect(wrapper.find('.comments_options').exists()).toBe(false)
  })
})
