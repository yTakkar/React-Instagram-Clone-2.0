import React from 'react'
import { PureGallery } from '../gallery-s'
import { shallow } from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'
import Post from '../../../../../store/mockStore/mock-reducers/Post'
import User from '../../../../../store/mockStore/mock-reducers/User'

describe('Gallery Component', () => {
  const props = {
    param: 'takkar',
    photos: Post.photos,
    ud: User.user_details
  }

  // shallow snapshot testing
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <PureGallery
        {...props}
      />
    )
    expect(result).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(
      <PureGallery
        {...props}
        dispatch={jest.fn()}
      />
    )
    wrapper.setState({ loading: false })
    expect(
      wrapper.find('IsLoading').prop('loading')
    ).toEqual(false)
  })

})
