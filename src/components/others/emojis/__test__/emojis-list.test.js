import React from 'react'
import { create } from 'react-test-renderer'
import EmojisList from '../emojis-list'
import { shallow } from 'enzyme'
import d from '../../../../utils/API/DOM'

describe('EmojisList component', () => {
  const props = {
    position: {
      top: 10,
      left: 40,
    },
    textArea: '#testing-textarea',
    updateStateValue() {},
  }

  beforeAll(() => {
    let textArea = document.createElement('textarea')
    textArea.setAttribute('id', 'testing-textarea')
    textArea.value = 'Hello'
    document.body.appendChild(textArea)
  })

  afterAll(() => {
    document.querySelector('#testing-textarea').remove()
  })

  it('should match snapshot of EmojisList component', () => {
    const tree = create(<EmojisList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should return updated value with emojis when clicked on 😀 & 😎 resp.', () => {
    let updatedValue = ''
    const wrapper = shallow(
      <EmojisList
        {...props}
        updateStateValue={value => (updatedValue = value)}
      />
    )
    const mockedEvent = {
      target: {
        classList: {
          add() {},
        },
      },
    }
    const textarea = new d('#testing-textarea')

    // when clicked on first emoji, expect the below result
    wrapper
      .find('li')
      .first()
      .simulate('click', mockedEvent)
    expect(updatedValue).toEqual('😀Hello')

    // when clicked on 15th emoji and textArea's seclectionStart property set to 3, it should expect the below result
    textarea.toDOM().selectionStart = 3
    wrapper
      .find('li')
      .at(14)
      .simulate('click', mockedEvent)
    expect(updatedValue).toEqual('Hel😎lo')
  })
})
