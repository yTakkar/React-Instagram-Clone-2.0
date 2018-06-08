import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from 'react-test-renderer'
import OpenPost from '../openPost'

describe('OpenPost Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <OpenPost
          when='feed'
          post_id={11}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when prop when == viewPost', () => {
    const tree = create(
      <Router>
        <OpenPost
          when='viewPost'
          post_id={11}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
