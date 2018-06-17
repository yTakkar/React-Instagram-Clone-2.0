import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupOptions from '../options'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('GroupOptions Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <GroupOptions
            toggleOptions={jest.fn()}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
