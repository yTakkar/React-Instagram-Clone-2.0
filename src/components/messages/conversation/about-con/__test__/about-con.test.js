import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import AboutConversation, { PureAboutConversation } from '../about-con'
import { shallow } from 'enzyme'
import Message from '../../../../../store/__mocks__/reducers/Message'

describe('AboutConversation Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <AboutConversation back={mockFn} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading = false', () => {
    const wrapper = shallow(
      <PureAboutConversation
        back={mockFn}
        cd={Message.conDetails}
        dispatch={mockFn}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
