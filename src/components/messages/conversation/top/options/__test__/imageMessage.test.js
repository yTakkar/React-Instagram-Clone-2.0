import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import ImageMessage, { PureImageMessage } from '../imageMessage'
import { shallow } from 'enzyme'
import Message from '../../../../../../store/__mocks__/reducers/Message'

describe('ImageMessage Component', () => {
  const mockFn = jest.fn()
  const props = {
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ImageMessage {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock imageMessage action when file input is changed', () => {
    const wrapper = shallow(
      <PureImageMessage {...props} cd={Message.conDetails} dispatch={mockFn} />
    )
    wrapper.find('FileInput').prop('fileChange')({
      preventDefault() {},
      target: { files: [] },
    })
  })
})
