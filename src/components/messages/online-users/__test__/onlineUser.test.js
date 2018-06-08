import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import OnlineUser, { PureOnlineUser } from '../onlineUser'
import Message from '../../../../store/mockStore/mock-reducers/Message'
import mockStore from '../../../../store/mockStore/mockStore'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'

describe('OnlineUser Component', () => {
  let mockFn = jest.fn()

  const comp = index => (
    <Provider store={mockStore}>
      <Router>
        <OnlineUser
          {...Message.onlineUsers[index]}
          back={mockFn}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp(0)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when mutualUsersCount > 0', () => {
    const tree = create(comp(1)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock message action', () => {
    const wrapper = shallow(
      <PureOnlineUser
        {...Message.onlineUsers[0]}
        back={mockFn}
      />
    )
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {}
    })
  })

})
