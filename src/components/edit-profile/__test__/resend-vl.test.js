import React from 'react'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import ResendVL from '../resend-vl'
import { shallow } from 'enzyme'

describe('ResendVL Component', () => {
  let dataElement

  beforeAll(() => (dataElement = MockDataElement()))

  afterAll(() => dataElement.remove())

  it('should match snapshot and show SecondaryButton', () => {
    const tree = create(<ResendVL />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock resend-vl action when clicked', () => {
    const wrapper = shallow(<ResendVL />)
    wrapper.find('SecondaryButton').simulate('click', { preventDefault() {} })
  })

  it('should match snapshot with null', () => {
    dataElement.setAttribute('data-email-verified', 'yes')
    const tree = create(<ResendVL />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
