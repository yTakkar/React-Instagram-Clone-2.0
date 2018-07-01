import React from 'react'
import CheckBox from '../checkbox'
import { create } from 'react-test-renderer'

describe('CheckBox Component', () => {
  const props = {
    label: 'CheckBox label',
    checked: true,
    changeValue: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<CheckBox {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with disabled prop', () => {
    const tree = create(<CheckBox {...props} disabled />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
