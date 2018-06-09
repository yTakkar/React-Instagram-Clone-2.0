import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Shared, { PureShared } from '../shared-s'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'
import Post from '../../../../../store/mockStore/mock-reducers/Post'

describe('Shared Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Shared param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureShared
        dispatch={jest.fn()}
        param='ghalib'
        ud={User.user_details}
        shared={Post.shared}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
