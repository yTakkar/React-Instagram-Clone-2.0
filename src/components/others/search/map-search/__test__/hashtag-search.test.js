import React from 'react'
import { create } from 'react-test-renderer'
import HashtagSearch from '../hashtag-search'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Hashtag-Search Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <HashtagSearch
          hashtag='#travel'
          clicked={() => {}}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
