import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import ProfileSettings, { PureProfileSettings } from '../profile-settings'
import { shallow } from 'enzyme'
import User from '../../../../../store/__mocks__/reducers/User'

describe('ProfileSettings Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ProfileSettings />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(
      <PureProfileSettings session={User.session} dispatch={jest.fn()} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
