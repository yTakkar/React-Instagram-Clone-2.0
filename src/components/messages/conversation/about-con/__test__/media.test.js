import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import ConversationMedia from '../media'
import Message from '../../../../../store/mockStore/mock-reducers/Message'

describe('ConversationMedia Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <ConversationMedia/>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Nothing/> when media.length == 0', () => {
    Message.conAbout.media = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
