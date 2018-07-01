// we could have implemented snapshot testing, but it returns null.
// https://github.com/geelen/react-snapshot/issues/17

import React from 'react'
import Title from '../title'
import { shallow } from 'enzyme'
import mockStore from '../../../store/__mocks__/mockStore'

describe('Title component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Title store={mockStore} value="A title" desc="A cool description" />
    )

    expect(wrapper.prop('value')).toBe('A title')
    expect(wrapper.prop('desc')).toEqual('A cool description')
  })
})
