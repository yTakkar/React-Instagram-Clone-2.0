import React from 'react'
import { create } from 'react-test-renderer'
import RequiredInputs from '../required-inputs'

describe('Required-fields Component', () => {
  const props = {
    fields: {
      username: 'vsocial',
      firstname: 'iam_',
      surname: 'Vsocial',
      email: 'vsocial@gmail.com',
    },
    change: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<RequiredInputs {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
