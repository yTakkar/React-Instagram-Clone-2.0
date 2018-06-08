import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import PostItActions, { PurePostItActions } from '../actions'
import { shallow } from 'enzyme'
import Group from '../../../../store/mockStore/mock-reducers/Group'
import Post from '../../../../store/mockStore/mock-reducers/Post'

describe('PostItActions Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostItActions
          back={mockFn}
        />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock postIt & back actions', () => {
    const wrapper = shallow(
      <PurePostItActions
        back={mockFn}
        group_name={Group.group_details.name}
        postIt={Post.postIt}
        dispatch={mockFn}
      />
    )
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {}
    })
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {}
    })
  })

})
