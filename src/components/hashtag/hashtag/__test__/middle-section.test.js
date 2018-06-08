import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { PureHashtagMiddleSection } from '../middle-section'
import Hashtag from '../../../../store/mockStore/mock-reducers/Hashtag'

describe('HashtagMiddleSection Component', () => {
  const renderer = new ShallowRenderer()

  const comp = (loading=false) => (
    <PureHashtagMiddleSection
      loading={loading}
      hashtag='travel'
      posts={Hashtag.hashtagPosts}
    />
  )

  it('should match snapshot', () => {
    const tree = renderer.render(comp())
    expect(tree).toMatchSnapshot()
  })

  it('should show <Instagram/> loader when loading=true', () => {
    const tree = renderer.render(comp(true))
    expect(tree).toMatchSnapshot()
  })

})
