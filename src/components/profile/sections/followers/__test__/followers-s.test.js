import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Followers, { PureFollowers } from '../followers-s'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'
import Follow from '../../../../../store/mockStore/mock-reducers/Follow'

describe('Followers Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Followers param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureFollowers
        dispatch={jest.fn()}
        param='ghalib'
        ud={User.user_details}
        followers={Follow.followers}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
