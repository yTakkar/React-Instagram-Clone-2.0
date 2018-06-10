import React from 'react'
import { create } from 'react-test-renderer'
import GroupBanner from '../banner'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'

describe('GroupBanner Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <GroupBanner/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
