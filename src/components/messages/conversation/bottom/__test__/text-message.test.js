import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import TextMessage, { PureTextMessage } from '../text-message'
import { shallow } from 'enzyme'
import Message from '../../../../../store/__mocks__/reducers/Message'

describe('TextMessage Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <TextMessage />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock textMessage action when form is submitted', () => {
    const wrapper = shallow(<PureTextMessage cd={Message.conDetails} />)
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    })
  })
})
