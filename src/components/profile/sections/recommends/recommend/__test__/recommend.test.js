import React from 'react'
import MockDataElement from '../../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import RecommendList, { PureRecommendList } from '../recommend'
import { shallow } from 'enzyme'
import Follow from '../../../../../../store/mockStore/mock-reducers/Follow'
import User from '../../../../../../store/mockStore/mock-reducers/User'

describe('RecommendList Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <RecommendList
            param='takkar'
            {...Follow.recommendations[0]}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeRecommendation action', () => {
    const wrapper = shallow(
      <PureRecommendList
        param='takkar'
        {...Follow.recommendations[0]}
        ud={User.user_details}
      />
    )
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {}
    })
  })

})
