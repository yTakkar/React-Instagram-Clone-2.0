import React from 'react'
import { create } from 'react-test-renderer'
import FollowSectionEnd from '../follow-section-end'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Follow-Section-End Component', () => {
  const props = {
    loading: false,
    len: 0,
    when: 'followers',
  }

  it('should match snapshot and show Nothing component', () => {
    const tree = create(
      <FollowSectionEnd {...props} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show End component', () => {
    const tree = create(
      <FollowSectionEnd {...props} len={10} store={mockStore} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
