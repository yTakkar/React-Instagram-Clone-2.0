import React from 'react'
import { create } from 'react-test-renderer'
import ConversationOptions from '../options'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/mockStore/mockStore'

describe('ConversationOptions Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ConversationOptions
          toggleOptions={mockFn}
          hideConversation={mockFn}
        />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
