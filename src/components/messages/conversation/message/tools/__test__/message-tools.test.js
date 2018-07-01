import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import MessageTools from '../message-tools'

describe('MessageTools Component', () => {
  let dataElement

  const mockFn = jest.fn()
  const props = {
    messageDetails: {
      message_id: 44,
      message: 'a message',
      type: 'text',
      mssg_by: 20,
    },
    updateMessage: mockFn,
  }

  beforeAll(() => (dataElement = MockDataElement()))

  afterAll(() => dataElement.remove())

  it('should match snapshot with null when post is not mine & iam not an admin', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MessageTools {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when post is mine', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MessageTools
          messageDetails={{
            ...props.messageDetails,
            mssg_by: 24,
          }}
          updateMessage={mockFn}
        />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when iam the admin', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const tree = create(
      <Provider store={mockStore}>
        <MessageTools {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
