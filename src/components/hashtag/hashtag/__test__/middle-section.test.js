import React from 'react'
import { PureHashtagMiddleSection } from '../middle-section'
import Hashtag from '../../../../store/__mocks__/reducers/Hashtag'
import { shallow } from 'enzyme'

describe('HashtagMiddleSection Component', () => {
  const comp = (loading = false) => (
    <PureHashtagMiddleSection
      loading={loading}
      hashtag="travel"
      posts={Hashtag.hashtagPosts}
    />
  )

  it('should match snapshot', () => {
    const tree = shallow(comp())
    expect(tree).toMatchSnapshot()
  })

  it('should show <Instagram/> loader when loading=true', () => {
    const tree = shallow(comp(true))
    expect(tree).toMatchSnapshot()
  })
})
