import React from 'react'
import EditCommentOption from '../edit'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('EditCommentOption Component', () => {
  const mockFn = jest.fn()
  const props = {
    commentDetails: {
      comment_id: 44,
      text: 'a cool comment',
      type: 'text',
    },
    updateCommentText: mockFn,
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(<EditCommentOption {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when type != text', () => {
    const tree = create(
      <EditCommentOption
        commentDetails={{
          ...props.commentDetails,
          type: 'image',
        }}
        updateCommentText={mockFn}
        toggleOptions={mockFn}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <EditComment/> when clicked on edit option', () => {
    const wrapper = shallow(<EditCommentOption {...props} />)
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Connect(EditComment)').exists()).toBe(true)
  })
})
