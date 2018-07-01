import React from 'react'
import { create } from 'react-test-renderer'
import AddEmojis from '../add-emojis'
import { shallow } from 'enzyme'

describe('Add-Emojis Component', () => {
  const props = {
    position: {
      top: 10,
      left: 50,
    },
    textArea: '.some-textarea',
    updateTextArea() {},
  }

  it('should match snapshot', () => {
    const tree = create(<AddEmojis {...props} />).toJSON()
    expect(tree).toMatchSnapshot()

    const tree2 = create(
      <AddEmojis
        {...props}
        disabled
        addClassOnClicked
        className=".emoji-modal-shown"
      />
    ).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  it('should toggle Emojis Component on click', () => {
    const wrapper = shallow(<AddEmojis {...props} />)

    expect(wrapper.state().showEmojis).toBeFalse()
    expect(wrapper.find('Emojis').exists()).toBeFalse()

    wrapper.find('span').simulate('click')

    expect(wrapper.find('Emojis').exists()).toBeTrue()
  })
})
