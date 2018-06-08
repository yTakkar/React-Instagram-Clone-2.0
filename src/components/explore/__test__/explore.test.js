import React from 'react'
import { create } from 'react-test-renderer'
import Explore from '../explore'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Explore Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore} >
        <Router>
          <Explore
            match={{ url: '/explore' }}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
