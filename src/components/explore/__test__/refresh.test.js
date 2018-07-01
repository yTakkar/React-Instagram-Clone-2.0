import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import RefreshExplores from '../refresh'
import mockStore from '../../../store/__mocks__/mockStore'
import { mount } from 'enzyme'

describe('RefreshExplores Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <RefreshExplores url="/explore" />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock refresh action when clicked', () => {
    const wrapper = mount(comp)
    wrapper.find('a.exp_refresh').simulate('click', { preventDefault() {} })
  })
})
