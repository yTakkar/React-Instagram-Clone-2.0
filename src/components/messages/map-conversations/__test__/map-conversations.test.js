import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import MapConversations, { PureMapConversations } from '../map-conversations'
import Message from '../../../../store/__mocks__/reducers/Message'
import { shallow } from 'enzyme'

describe('MapConversations Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MapConversations showConversation={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when conversations.length == 0', () => {
    Message.conversations = []
    const wrapper = shallow(
      <PureMapConversations
        showConversation={mockFn}
        conversations={Message.conversations}
      />
    )
    expect(wrapper.find('.con_count').text()).toEqual('No conversations')

    expect(wrapper.find('Nothing').exists()).toBe(true)
  })
})
