import React from 'react'
import FAIcon from '../font-awesome-icon'
import { create } from 'react-test-renderer'

describe('Font Awesome Component', () => {
  it('should match snapshot with lock icon', () => {
    const tree = create(<FAIcon icon="lock" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with camera icon', () => {
    const tree = create(<FAIcon icon="camera" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
