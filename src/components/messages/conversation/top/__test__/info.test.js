import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import ConversationInfo from '../info'
import Message from '../../../../../store/mockStore/mock-reducers/Message'

describe('ConversationInfo Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <ConversationInfo/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when user is online', () => {
    Message.conDetails.isOnline = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
