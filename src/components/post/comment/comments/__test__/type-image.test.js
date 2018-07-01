import React from 'react'
import { create } from 'react-test-renderer'
import CommentTypeImage from '../type-image'
import { shallow } from 'enzyme'

describe('CommentTypeImage Component', () => {
  const comp = (
    <CommentTypeImage commentSrc="instagram_comment_1518972851259.jpg" />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <ImageTheatre/> when clicked on image', () => {
    const wrapper = shallow(comp)
    wrapper.find('.comments_img').simulate('click')
    expect(wrapper.find('ImageTheatre').exists()).toBe(true)
  })
})
