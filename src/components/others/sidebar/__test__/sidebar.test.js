import React from 'react'
import SideBar from '../sidebar'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'

describe('SideBar Component', () => {
  const comp = (
    <Router>
      <SideBar
        uc={0}
        un={4}
      />
    </Router>
  )
  let dataElement

  beforeAll(() => {
    dataElement = document.createElement('div')
    dataElement.setAttribute('class', 'data')
    dataElement.setAttribute('data-username', 'takkar')
    dataElement.setAttribute('data-isadmin', 'false')
    document.body.appendChild(dataElement)
  })

  afterAll(() =>
    dataElement.remove()
  )

  it('should match snapshot and admin should be logged-out', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = mount(comp)
    expect(wrapper.find('.m_n_a_admin').exists()).toBe(true)
  })

  it('should mock admin-logout action when clicked', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const wrapper = mount(comp)

    wrapper.find('.admin-logout').simulate(
      'click',
      { preventDefault() {} }
    )
  })

})
