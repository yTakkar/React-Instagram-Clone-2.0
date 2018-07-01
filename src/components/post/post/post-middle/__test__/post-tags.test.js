import React from 'react'
import { create } from 'react-test-renderer'
import PostTags from '../post-tags'
import { shallow } from 'enzyme'

describe('PostTags Component', () => {
  const props = {
    post_id: 11,
    tags_count: 1,
  }

  it('should match snapshot', () => {
    const tree = create(<PostTags {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when tags_count == 0', () => {
    const tree = create(<PostTags post_id={11} tags_count={0} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Tags/> when showTags == true', () => {
    const wrapper = shallow(<PostTags {...props} />)
    wrapper.setState({ showTags: true })
    expect(wrapper.find('Connect(Tags)').exists()).toBe(true)
  })

  it('should decrement tags_count', () => {
    const wrapper = shallow(<PostTags {...props} />)
    expect(wrapper.state().tags_count).toBe(1)
    wrapper.instance().decrementTags()
    expect(wrapper.state().tags_count).toBe(0)
  })
})
