import React from 'react'
import TextInput from '../text'
import { create } from 'react-test-renderer'

describe('TextInput Component', () => {
  const props = {
    value: 'a value',
    valueChange: jest.fn(),
  }

  it('should match snapshot with input type text', () => {
    const tree = create(
      <TextInput {...props} placeholder="Enter username" maxLength="32" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with input type password', () => {
    const tree = create(
      <TextInput {...props} type="password" placeholder="Enter password" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with input type email', () => {
    const tree = create(
      <TextInput {...props} type="email" placeholder="Enter email" disabled />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
