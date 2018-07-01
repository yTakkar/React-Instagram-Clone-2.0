import React from 'react'
import { shallow } from 'enzyme'
import Prompt from '../prompt'
import { create } from 'react-test-renderer'

describe('Prompt Component', () => {
  const mockFn = jest.fn()
  const defaultProps = {
    title: 'Title of the prompt component',
    content: 'Some content here..',
    actionText: 'Delete',
    action: mockFn,
    back: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(<Prompt {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with blurred prop', () => {
    const tree = create(<Prompt {...defaultProps} blurred />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should simulate click events', () => {
    const wrapper = shallow(<Prompt {...defaultProps} />)

    wrapper.find('PrimaryButton').simulate('click')
    wrapper.find('SecondaryButton').simulate('click', { preventDefault() {} })
  })
})
