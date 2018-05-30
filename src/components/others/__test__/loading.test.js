import React from 'react'
import renderer from 'react-test-renderer'
import Loading from '../loading'

describe('Loading Component', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<Loading/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
