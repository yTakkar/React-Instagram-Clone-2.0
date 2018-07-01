import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import ChangeAccountType, { PureChangeAccountType } from '../account-type'
import { shallow } from 'enzyme'

describe('ChangeAccountType Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <ChangeAccountType />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  const simulate = (wrapper, type) =>
    wrapper.find('select').simulate('change', {
      target: { value: type },
    })

  it('should change accountType when select is changed', () => {
    const wrapper = shallow(<PureChangeAccountType />)

    simulate(wrapper, 'private')
    expect(wrapper.find('.type_indicator').text()).toEqual('private')

    // simulate again
    simulate(wrapper, 'public')
    expect(wrapper.find('.type_indicator').text()).toEqual('public')
  })
})
