import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import OnlineUsers, { PureOnlineUsers } from '../onlineUsers'
import { shallow } from 'enzyme'
import Message from '../../../../store/mockStore/mock-reducers/Message'

describe('OnlineUsers Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <OnlineUsers
            back={mockFn}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(
      <PureOnlineUsers
        back={mockFn}
        onlineUsers={Message.onlineUsers}
        dispatch={mockFn}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })

})
