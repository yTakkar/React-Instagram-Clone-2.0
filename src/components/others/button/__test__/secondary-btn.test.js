import React from 'react'
import SecondaryButton from '../secondary-btn'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Secondary Button Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <SecondaryButton label="Add post" onClick={mockFn} extraClass="p_add" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with label prop as a function', () => {
    let label = () => <img src="/images/spacecraft.jpg" />
    const tree = create(
      <SecondaryButton label={label} onClick={mockFn} disabled />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should simulate click event', () => {
    const wrapper = shallow(
      <SecondaryButton label="Add post" onClick={mockFn} extraClass="p_add" />
    )

    wrapper.find('a').simulate('click', { preventDefault() {} })
  })
})
