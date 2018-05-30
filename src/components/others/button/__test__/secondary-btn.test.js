import React from 'react'
import SecondaryButton from '../secondary-btn'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Secondary Button Component', () => {
  let clicked = () => {}

  it('should match snapshot and simulate click event', () => {
    const component = (
      <SecondaryButton
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
      <SecondaryButton
        label={label}
        onClick={clicked}
        disabled
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
