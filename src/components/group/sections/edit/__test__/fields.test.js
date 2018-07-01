import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { PureEditGroupFields } from '../fields'

describe('EditGroupFields Component', () => {
  MockDataElement()

  const props = {
    fields: {
      name: 'group name',
      bio: 'group bio',
      isPrivate: false,
    },
    changeValue: jest.fn(),
    admin: 24,
  }

  it('should match snapshot', () => {
    const tree = create(<PureEditGroupFields {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and disabled inputs', () => {
    const tree = create(<PureEditGroupFields {...props} admin={7} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
