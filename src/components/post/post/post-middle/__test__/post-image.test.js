import React from 'react'
import { create } from 'react-test-renderer'
import PostImage from '../post-image'
import { shallow } from 'enzyme'

describe('PostImage Component', () => {
  const postDetails = {
    post_id: 11,
    post_time: '1518972814710',
    description: 'description',
    imgSrc: 'instagram_1518972814710.jpg',
    filter: 'filter-ashby',
    tags_count: 1,
    username: 'ghalib',
  }

  it('should match snapshot', () => {
    const tree = create(<PostImage postDetails={postDetails} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <ImageTheatre/> when showImage=true', () => {
    const wrapper = shallow(<PostImage postDetails={postDetails} />)
    wrapper.setState({ showImage: true })
    expect(wrapper.find('ImageTheatre').exists()).toBe(true)
  })
})
