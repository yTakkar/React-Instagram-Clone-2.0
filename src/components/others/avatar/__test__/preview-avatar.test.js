import React from 'react'
import { create } from 'react-test-renderer'
import PreviewAvatar from '../preview-avatar'
import { shallow } from 'enzyme'

describe('Preview-Avatar Component', () => {
  const props = {
    previewAvatar: '/images/location.jpg',
    back() {},
    upload() {},
  }

  it('should match snapshot', () => {
    const tree = create(<PreviewAvatar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should perform some click events', () => {
    const wrapper = shallow(<PreviewAvatar {...props} />)

    wrapper.find('SecondaryButton').simulate('click')
    wrapper.find('PrimaryButton').simulate('click')
  })
})
