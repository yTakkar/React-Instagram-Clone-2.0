import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Posts from '../posts-s'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'

describe('Posts Component', () => {
  let dataElement

  beforeEach(() =>
    dataElement = MockDataElement()
  )

  afterEach(() =>
    dataElement.remove()
  )

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Posts param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when profile is not mine', () => {
    dataElement.setAttribute('data-session', '7')
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Posts param='ghalib' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
