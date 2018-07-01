import React from 'react'
import { create } from 'react-test-renderer'
import CommentType from '../comment-type'

describe('CommentType Component', () => {
  it('should match snapshot when type == text', () => {
    const tree = create(<CommentType type="text" text="a comment" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when no comment', () => {
    const tree = create(<CommentType type="text" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when type == image', () => {
    const tree = create(
      <CommentType
        type="image"
        commentSrc="instagram_comment_1518972851259.jpg"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when type == sticker', () => {
    const tree = create(
      <CommentType
        type="sticker"
        commentSrc="instagram_comment_1527447929485.jpg"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
