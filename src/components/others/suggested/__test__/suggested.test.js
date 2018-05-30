import React from 'react'
import { create } from 'react-test-renderer'
import Suggested from '../suggested'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'

describe('Suggested Component', () => {
  const comp = (
    <Provider store={mockStore} >
      <Router>
        <Suggested when='home' />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
