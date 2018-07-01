import React from 'react'
import TextArea from '../textArea'
import { create } from 'react-test-renderer'

describe('TextArea Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <TextArea
        value="A value"
        placeholder="Enter bio"
        valueChange={jest.fn()}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
