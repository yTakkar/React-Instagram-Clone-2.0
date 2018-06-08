import React from 'react'
import { create } from 'react-test-renderer'
import AdminLogin from '../admin-login'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import MockDataElement from '../../../utils/__test__/mock-dataElement'

describe('Admin-Login Component', () => {
  let dataElement

  beforeAll(() =>
    dataElement = MockDataElement()
  )

  afterAll(() =>
    dataElement.remove()
  )

  const comp = (
    <Provider store={mockStore} >
      <Router>
        <AdminLogin
          location={{ search: '/' }}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock admin-login submit action', () => {
    const wrapper = mount(comp)
    wrapper.find('form').simulate(
      'submit',
      { preventDefault() {} }
    )
  })

  it('should redirect to /is-admin route when user is admin', () => {
    dataElement.setAttribute('data-isadmin', 'true')

    // To ignore warning:
    // 'You tried to redirect to the same route you're currently on: "/is-admin"'
    console.error = jest.fn()

    mount(comp)
    expect(location.pathname).toEqual('/is-admin')
  })

})
