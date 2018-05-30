import React from 'react'
import PrimaryButton from '../primary-btn'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Primary Button Component', () => {
  let clicked = () => {}

  it('should match snapshot and simulate click event', () => {
    const component = (
      <PrimaryButton
        label='Add post'
        onClick={clicked}
        extraClass='p_add'
      />
    )
    const tree = create(component).toJSON()
    const wrapper = shallow(component)

    wrapper.find('a').simulate(
      'click',
      { preventDefault() {} }
    )
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with label prop as a function', () => {
    let label = () => (
      <img src='/images/spacecraft.jpg' />
    )
    const tree = create(
      <PrimaryButton
        label={label}
        onClick={clicked}
        disabled
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

})
