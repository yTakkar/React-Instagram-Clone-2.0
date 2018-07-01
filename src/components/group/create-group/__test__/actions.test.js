import React from 'react'
import { create } from 'react-test-renderer'
import CreateGroupActions from '../actions'
import { shallow } from 'enzyme'

describe('CreateGroupActions Component', () => {
  const comp = (
    <CreateGroupActions back={jest.fn()} create={jest.fn()} name="dd" />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock back & create actions', () => {
    const wrapper = shallow(comp)

    // create
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })

    // back
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
