import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { PureHashtag } from '../hashtag'
import User from '../../../../store/mockStore/mock-reducers/User'

describe('Hashtag Component', () => {

  // shallow snapshot
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <PureHashtag
        match={{
          params: { hashtag: 'travel' }
        }}
        session={User.session}
      />
    )
    expect(tree).toMatchSnapshot()
  })

})
