import React from 'react'
import { PureGallery } from '../gallery-s'
import { shallow } from 'enzyme'
import Post from '../../../../../store/__mocks__/reducers/Post'
import User from '../../../../../store/__mocks__/reducers/User'

describe('Gallery Component', () => {
  const props = {
    param: 'takkar',
    photos: Post.photos,
    ud: User.user_details,
  }

  // shallow snapshot testing
  it('should match snapshot', () => {
    const result = shallow(<PureGallery {...props} dispatch={jest.fn()} />)
    expect(result).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(<PureGallery {...props} dispatch={jest.fn()} />)
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
