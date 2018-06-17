import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import NewestMembersDiv from '../newestDiv'

describe('NewestMembersDiv Component', () => {

  const comp = (
    <Provider store={mockStore}>
      <Router>
        <NewestMembersDiv
          group={34}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
