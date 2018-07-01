import React from 'react'
import ImageTheatre from '../imageTheatre'
import { create } from 'react-test-renderer'

describe('ImageTheatre Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <ImageTheatre
        showInfo={false}
        imgSrc="/images/elephant-march.png"
        filter="ashly"
        back={jest.fn()}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
