import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import UnsendMessages, { PureUnsendMessages } from '../unsendMssgs'
import { shallow } from 'enzyme'
import Message from '../../../../../../store/__mocks__/reducers/Message'

describe('UnsendMessages Component', () => {
  const mockFn = jest.fn()
  const props = {
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <UnsendMessages {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on unsend option', () => {
    const wrapper = shallow(
      <PureUnsendMessages
        {...props}
        con_id={Message.conDetails.con_id}
        messages={Message.messages}
      />
    )
    wrapper.find('.dlt_mssgs').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it("should mock unsendMessages action when clicked on Prompt's action button", () => {
    const wrapper = shallow(
      <PureUnsendMessages
        {...props}
        con_id={Message.conDetails.con_id}
        messages={Message.messages}
      />
    )
    wrapper.setState({ unsend: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })

  it('should match snapshot with null when messages.length == 0', () => {
    Message.messages = []
    const tree = create(
      <Provider store={mockStore}>
        <UnsendMessages {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
