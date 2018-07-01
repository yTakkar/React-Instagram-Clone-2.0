import React from 'react'
import { create } from 'react-test-renderer'
import MyLastMssg from '../myLastMssg'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'

describe('MyLastMssg Component', () => {
  let dataElement

  beforeAll(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  it('should match snapshot', () => {
    const tree = create(<MyLastMssg lastMssgBy={24} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and return null when lastMssgBy != session ID stored in dataElement', () => {
    const tree = create(<MyLastMssg lastMssgBy={7} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
