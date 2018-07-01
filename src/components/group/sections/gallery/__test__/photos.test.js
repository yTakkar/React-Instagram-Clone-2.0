import React from 'react'
import { PureGroupPhotos } from '../photos'
import Post from '../../../../../store/__mocks__/reducers/Post'
import { shallow, mount } from 'enzyme'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('GroupPhotos Component', () => {
  const comp = <PureGroupPhotos gd={Group.group_details} photos={Post.photos} />

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
      <PureGroupPhotos photos={[]} gd={Group.group_details} />
    )
    expect(wrapper.find('Nothing').exists()).toBe(true)
    expect(wrapper.find('Gallery').exists()).toBe(false)
  })
})
