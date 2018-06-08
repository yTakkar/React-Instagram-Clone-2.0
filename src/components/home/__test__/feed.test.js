import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Feed from '../feed'
import { create } from 'react-test-renderer'

describe('Feed Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <Feed/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
