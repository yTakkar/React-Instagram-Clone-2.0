import React from 'react'
import { create } from 'react-test-renderer'
import AdminLogin from '../admin-login'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import { mount, shallow } from 'enzyme'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'

describe('Admin-Login Component', () => {
  let dataElement = MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <AdminLogin location={{ search: '/' }} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock admin-login submit action', () => {
    const wrapper = mount(comp)
    wrapper.find('form').simulate('submit', { preventDefault() {} })
  })

  it('should redirect to /is-admin route when user is admin', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const wrapper = shallow(<AdminLogin location={{ search: '/' }} />)
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })
})
