import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Followings, { PureFollowings } from '../followings-s'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/__mocks__/reducers/User'
import Follow from '../../../../../store/__mocks__/reducers/Follow'

describe('Followings Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Followings param="takkar" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureFollowings
        dispatch={jest.fn()}
        param="ghalib"
        ud={User.user_details}
        followings={Follow.followings}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
