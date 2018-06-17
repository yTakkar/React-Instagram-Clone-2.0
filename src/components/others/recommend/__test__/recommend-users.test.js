import React from 'react'
import { create } from 'react-test-renderer'
import RecommendUsers from '../recommend-users'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('RecommendUsers Component', () => {
  const mockFn = jest.fn()
  const comp = (
    <Provider store={mockStore} >
      <Router>
        <RecommendUsers
          back={mockFn}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
