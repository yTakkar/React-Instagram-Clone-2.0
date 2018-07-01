import React from 'react'
import { PureGroupGallery } from '../gallery-s'
import { shallow } from 'enzyme'
import Post from '../../../../../store/__mocks__/reducers/Post'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('GroupGallery Component', () => {
  const props = {
    param: 'takkar',
    photos: Post.photos,
    gd: Group.group_details,
  }

  const comp = <PureGroupGallery {...props} dispatch={jest.fn()} />

  // shallow snapshot testing
  it('should match snapshot', () => {
    const result = shallow(comp)
    expect(result).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(comp)
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toEqual(false)
  })
})
