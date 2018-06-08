import React from 'react'
import { create } from 'react-test-renderer'
import RequiredInputs from '../required-inputs'

describe('Required-fields Component', () => {
  const props = {
    fields: {
      username: 'takkar',
      firstname: 'iam_',
      surname: 'Takkar',
      email: 'takkar@gmail.com'
    },
    change: jest.fn()
  }

  it('should match snapshot', () => {
    console.error = jest.fn() // remove
    const tree = create(
      <RequiredInputs
        {...props}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
