import React from 'react'
import { create } from 'react-test-renderer'
import LikeInfo from '../info'

describe('LikeInfo Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <LikeInfo
        likeDetails={{
          like_by: 7,
          username: 'ghalib',
          like_time: '1516528068337',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
