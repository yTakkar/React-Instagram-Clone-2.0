import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Messages, { PureMessages } from '../messages'
import { shallow } from 'enzyme'

describe('Messages Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Messages />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading = false', () => {
    const wrapper = shallow(<PureMessages dispatch={mockFn} />)
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })

  it('should show <Conversation/> when showConversation == true', () => {
    const wrapper = shallow(<PureMessages dispatch={mockFn} />)
    wrapper.setState({
      selectedCon: {
        con_id: 44,
        unreadMssgs: 0,
      },
      showConversation: true,
    })
    expect(wrapper.find('Connect(Conversation)').exists()).toBe(true)
  })
})
