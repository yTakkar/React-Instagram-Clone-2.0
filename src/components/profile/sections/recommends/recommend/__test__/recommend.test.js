import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import RecommendList, { PureRecommendList } from '../recommend'
import { shallow } from 'enzyme'
import Follow from '../../../../../../store/__mocks__/reducers/Follow'
import User from '../../../../../../store/__mocks__/reducers/User'

describe('RecommendList Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <RecommendList param="takkar" {...Follow.recommendations[0]} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeRecommendation action', () => {
    const wrapper = shallow(
      <PureRecommendList
        param="takkar"
        {...Follow.recommendations[0]}
        ud={User.user_details}
      />
    )
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
