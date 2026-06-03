import React from 'react'
import SideBar from '../sidebar'
import { create } from 'react-test-renderer'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'

const mockStore = configureStore([thunk])({
  Language: {
    language: 'en',
  },
})

describe('SideBar Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <SideBar uc={0} un={4} />
    </Provider>
  )
  let dataElement

  beforeAll(() => (dataElement = MockDataElement()))

  afterAll(() => dataElement.remove())

  it('should match snapshot and admin should be logged-out', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = mount(comp)
    expect(wrapper.find('.m_n_a_admin').exists()).toBe(true)
  })

  it('should mock admin-logout action when clicked', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const wrapper = mount(comp)

    wrapper.find('.admin-logout').simulate('click', { preventDefault() {} })
  })
})
