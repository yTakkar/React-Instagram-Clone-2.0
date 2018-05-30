import React from 'react'
import Nothing from '../nothing'
import renderer from 'react-test-renderer'

describe('Nothing component', () => {
  const snapshot = renderer.create

  it('should match snapshot with default behaviour', () => {
    const tree = snapshot(<Nothing/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with elaphant image, a different message & a description message', () => {
    const tree = snapshot(
      <Nothing
        mssg='No users to explore!!'
        conPage
        secondMssg='A descriptive second message'
      />
    )

    expect(tree).toMatchSnapshot()
  })

  it('should return component only with an image (used by modals)', () => {
    const tree = snapshot(
      <Nothing showMssg={false} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

})
