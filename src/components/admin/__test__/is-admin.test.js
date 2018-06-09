import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import IsAdmin from '../is-admin'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import MockDataElement from '../../../utils/__test__/mock-dataElement'

describe('IsAdmin Component', () => {
  let dataElement = MockDataElement()
  dataElement.setAttribute('data-isadmin', 'true')

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore} >
        <Router>
          <IsAdmin/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should redirect to /admin-login route when user is not an admin', () => {
    dataElement.setAttribute('data-isadmin', 'false')
    const wrapper = shallow(<IsAdmin/>)
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })

})
