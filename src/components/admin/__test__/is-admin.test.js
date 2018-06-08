import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import IsAdmin from '../is-admin'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import MockDataElement from '../../../utils/__test__/mock-dataElement'

describe('IsAdmin Component', () => {
  let dataElement

  beforeAll(() => {
    dataElement = MockDataElement()
    dataElement.setAttribute('data-isadmin', 'true')
  })

  afterAll(() =>
    dataElement.remove()
  )

  const comp = (
    <Provider store={mockStore} >
      <Router>
        <IsAdmin/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should redirect to /admin-login route when user is not an admin', () => {
    dataElement.setAttribute('data-isadmin', 'false')

    // To ignore warning:
    // 'You tried to redirect to the same route you're currently on: "/is-admin"'
    console.error = jest.fn()

    mount(comp)
    expect(location.pathname).toEqual('/admin-login')
  })

})
