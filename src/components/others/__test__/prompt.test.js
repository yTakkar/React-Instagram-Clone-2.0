import React from 'react'
import { shallow } from 'enzyme'
import Prompt from '../prompt'
import renderer from 'react-test-renderer'

describe('Prompt Component', () => {
  const snapshot = renderer.create
  const mockFn = () => {}

  it('should work with given props and also change if props are changed', () => {
    const defaultProps = {
      title: 'Title of the prompt component',
      content: 'Some content here..',
      actionText: 'Delete',
      action: () => mockFn,
      back: () => mockFn,
    }

    let tree = snapshot(
      <Prompt {...defaultProps} />
    ).toJSON()

    const wrapper = shallow(
      <Prompt
        {...defaultProps}
      />
    )

    wrapper.find('PrimaryButton').simulate('click')
    wrapper.find('SecondaryButton').simulate(
      'click',
      { preventDefault() {} }
    )

    expect(tree).toMatchSnapshot()

    tree = snapshot(
      <Prompt
        {...defaultProps}
        blurred
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
