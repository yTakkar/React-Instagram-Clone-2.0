import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import GetLocation, { PureGetLocation } from '../getLocation'
import { shallow } from 'enzyme'
import Post from '../../../../store/__mocks__/reducers/Post'

describe('GetLocation Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <GetLocation />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock getLocation action when location icon is clicked', () => {
    const wrapper = shallow(<PureGetLocation postIt={Post.postIt} />)
    wrapper.find('.loc_add').simulate('click')
  })
})
