import React from 'react'
import PrimaryButton from '../primary-btn'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Primary Button Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <PrimaryButton label="Add post" onClick={mockFn} extraClass="p_add" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with label as a function and disabled=true', () => {
    let label = () => <img src="/images/spacecraft.jpg" />
    const tree = create(
      <PrimaryButton label={label} onClick={mockFn} disabled />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should simulate click events', () => {
    const wrapper = shallow(
      <PrimaryButton label="Add post" onClick={mockFn} extraClass="p_add" />
    )

    wrapper.find('a').simulate('click', { preventDefault() {} })
  })
})
