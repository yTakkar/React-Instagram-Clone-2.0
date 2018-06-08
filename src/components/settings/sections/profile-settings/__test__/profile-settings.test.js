import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import ProfileSettings, { PureProfileSettings } from '../profile-settings'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'

describe('ProfileSettings Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <ProfileSettings/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(
      <PureProfileSettings
        session={User.session}
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })

})
