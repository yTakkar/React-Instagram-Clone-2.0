import React from 'react'
import { create } from 'react-test-renderer'
import PostTopDetails from '../top-details'
import posts from '../../../../../store/__mocks__/reducers/posts'

describe('PostTopDetails Component', () => {
  it('should match snapshot', () => {
    const tree = create(<PostTopDetails details={{ ...posts[0] }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show group name when type == group', () => {
    const tree = create(
      <PostTopDetails
        details={{
          ...posts[0],
          type: 'group',
          group_id: 11,
          group_name: 'cool group',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show first & second name of user if no location', () => {
    const tree = create(
      <PostTopDetails
        details={{
          ...posts[0],
          location: '',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
