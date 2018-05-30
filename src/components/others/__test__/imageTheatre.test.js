import React from 'react'
import ImageTheatre from '../image-theatre'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('ImageTheatre Component', () => {
  const snapshot = renderer.create

  it('should match snapshot with just the image', () => {
    const tree = snapshot(
      <ImageTheatre showInfo={false} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with complete ImageTheatre', () => {
    const tree = snapshot(
      <Router>
        <ImageTheatre
          imgSrc='/images/spacecraft.jpg'
          username='takkar'
          link='/'
          time='1518972814710'
          filter='ashby'
        />
      </Router>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

})
