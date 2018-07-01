import React from 'react'
import { PureHashtag } from '../hashtag'
import User from '../../../../store/__mocks__/reducers/User'
import { shallow } from 'enzyme'

describe('Hashtag Component', () => {
  // shallow snapshot
  it('should match snapshot', () => {
    const tree = shallow(
      <PureHashtag
        match={{
          params: { hashtag: 'travel' },
        }}
        session={User.session}
        dispatch={jest.fn()}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
