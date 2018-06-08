import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import PopularHashtags from '../popular-hashtags'
import { BrowserRouter as Router } from 'react-router-dom'
import Hashtag from '../../../store/mockStore/mock-reducers/Hashtag'

describe('PopularHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <PopularHashtags/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.popularHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
