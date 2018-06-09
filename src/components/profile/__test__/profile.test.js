import React from 'react'
import MockDataElement from '../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Profile, { PureProfile } from '../profile'
import { shallow } from 'enzyme'
import User from '../../../store/mockStore/mock-reducers/User';

describe('Profile Component', () => {
  MockDataElement()

  const props = {
    match: {
      params: { username: 'takkar' },
      url: '/profile/takkar'
    }
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Profile {...props} />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureProfile
        {...props}
        ud={User.user_details}
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
