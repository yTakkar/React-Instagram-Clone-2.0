import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import UserHashtags from '../user-hashtags'
import { BrowserRouter as Router } from 'react-router-dom'
import Hashtag from '../../../store/mockStore/mock-reducers/Hashtag'

describe('UserHashtags Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <UserHashtags
          username='takkar'
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when hashtags.length == 0', () => {
    Hashtag.userHashtags = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
