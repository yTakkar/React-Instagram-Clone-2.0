import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import GroupHashtags from '../group-hashtags'
import { BrowserRouter as Router } from 'react-router-dom'
import Hashtag from '../../../store/mockStore/mock-reducers/Hashtag'

describe('GroupHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <GroupHashtags
          group={11}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.groupHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
