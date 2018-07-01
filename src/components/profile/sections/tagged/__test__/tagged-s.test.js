import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Tagged, { PureTagged } from '../tagged-s'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/__mocks__/reducers/User'
import Post from '../../../../../store/__mocks__/reducers/Post'

describe('Tagged Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Tagged param="takkar" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureTagged
        dispatch={jest.fn()}
        param="ghalib"
        ud={User.user_details}
        tagged={Post.tagged}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
