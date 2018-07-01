import React from 'react'
import { create } from 'react-test-renderer'
import OpenPost from '../openPost'

describe('OpenPost Component', () => {
  it('should match snapshot', () => {
    const tree = create(<OpenPost when="feed" post_id={11} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when prop when == viewPost', () => {
    const tree = create(<OpenPost when="viewPost" post_id={11} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
