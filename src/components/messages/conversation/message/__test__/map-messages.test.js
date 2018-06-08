import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import MapMessages from '../map-messages'
import Message from '../../../../../store/mockStore/mock-reducers/Message'

describe('MapMessages Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MapMessages/>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Nothing/> when messages.length == 0', () => {
    Message.messages = []
    const tree = create(
      <Provider store={mockStore}>
        <MapMessages/>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
