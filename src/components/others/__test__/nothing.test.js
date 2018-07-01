import React from 'react'
import Nothing from '../nothing'
import { create } from 'react-test-renderer'

describe('Nothing component', () => {
  it('should match snapshot with default behaviour', () => {
    const tree = create(<Nothing />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with elaphant image & a descriptive message', () => {
    const tree = create(
      <Nothing
        mssg="No users to explore!!"
        conPage
        secondMssg="A descriptive second message"
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should return component only with an image (used by modals)', () => {
    const tree = create(<Nothing showMssg={false} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
