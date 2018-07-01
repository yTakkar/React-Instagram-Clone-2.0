import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import Conversation, { PureConversation } from '../conversation'
import { shallow } from 'enzyme'

describe('Conversation Component', () => {
  const props = {
    con: {
      con_id: 45,
      unreadMssgs: 1,
    },
    hideConversation: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Conversation {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <PureConversation {...props} dispatch={jest.fn()} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
