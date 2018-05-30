import React from 'react'
import Spinner from '../spinner'
import renderer from 'react-test-renderer'

describe('Spinner Component', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<Spinner/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
