import React from 'react'
import { Provider } from 'react-redux'
import EditProfile, { PureEditProfile } from '../edit-profile'
import mockStore from '../../../store/__mocks__/mockStore'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'
import User from '../../../store/__mocks__/reducers/User'

describe('Edit-Profile Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <EditProfile />
    </Provider>
  )

  const pureComp = (
    <PureEditProfile
      ud={User.user_details}
      tags={User.tags}
      session={User.session}
      dispatch={jest.fn()}
    />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock update-profile action when clicked', () => {
    const wrapper = shallow(pureComp)
    wrapper.find('PrimaryButton').simulate('click', { preventDefault() {} })
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(pureComp)
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
