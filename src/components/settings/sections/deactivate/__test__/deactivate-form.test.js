import React from 'react'
import { create } from 'react-test-renderer'
import DeactivateForm from '../deactivate-form'
import { shallow } from 'enzyme'

describe('DeactivateForm Component', () => {
  const comp = <DeactivateForm password="mypassword" change={jest.fn()} />

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when form is submitted', () => {
    const wrapper = shallow(comp)
    wrapper
      .find('form.dlt_acc_form')
      .simulate('submit', { preventDefault() {} })
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it("should mock deactivate action when clicked on Prompt's done button", () => {
    const wrapper = shallow(comp)
    wrapper.setState({ showPrompt: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
