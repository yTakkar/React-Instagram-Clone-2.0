import React from 'react'
import DeleteCommentOption, { PureDeleteCommentOption } from '../delete'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'

describe('DeleteCommentOption Component', () => {
  const mockFn = jest.fn()
  const props = {
    commentDetails: {
      comment_id: 44,
      type: 'text',
      commentSrc: 'instagram_comment_1518972851259.jpg',
    },
    decrementComments: mockFn,
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <DeleteCommentOption {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on delete option', () => {
    const wrapper = shallow(<PureDeleteCommentOption {...props} />)
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it('should mock deleteComment action', () => {
    const wrapper = shallow(<PureDeleteCommentOption {...props} />)
    wrapper.setState({ deleteComment: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
