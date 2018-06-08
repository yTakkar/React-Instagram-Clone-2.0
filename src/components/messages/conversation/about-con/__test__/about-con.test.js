import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import AboutConversation, { PureAboutConversation } from '../about-con'
import { shallow } from 'enzyme'
import Message from '../../../../../store/mockStore/mock-reducers/Message'

describe('AboutConversation Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <AboutConversation
            back={mockFn}
          />
        </Router>
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
