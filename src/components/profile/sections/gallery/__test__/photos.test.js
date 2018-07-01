import React from 'react'
import { PureUserPhotos } from '../photos'
import User from '../../../../../store/__mocks__/reducers/User'
import Post from '../../../../../store/__mocks__/reducers/Post'
import { shallow, mount } from 'enzyme'

describe('UserPhotos Component', () => {
  const comp = <PureUserPhotos ud={User.user_details} photos={Post.photos} />

  // shallow snapshot
  it('should match snapshot', () => {
    const tree = shallow(comp)
    expect(tree).toMatchSnapshot()
  })

  it('show show Gallery', () => {
    const wrapper = shallow(comp)
    expect(wrapper.find('Nothing').exists()).toBe(false)
    expect(wrapper.find('Gallery').exists()).toBe(true)
    expect(wrapper.find('Gallery').prop('photos').length).toBe(1)
  })

  it('should show <ImageTheatre/> when clicked on a gallery photo', () => {
    const wrapper = mount(comp)
    wrapper.find('Gallery img').simulate('click')

    let imgTheatre = wrapper.find('ImageTheatre')
    expect(imgTheatre.exists()).toBe(true)
  })

  it('should show <Nothing/> when photos.length == 0', () => {
    const wrapper = shallow(
      <PureUserPhotos photos={[]} ud={User.user_details} />
    )
    expect(wrapper.find('Nothing').exists()).toBe(true)
    expect(wrapper.find('Gallery').exists()).toBe(false)
  })
})
