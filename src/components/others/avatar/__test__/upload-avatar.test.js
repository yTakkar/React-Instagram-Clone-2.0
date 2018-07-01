import React from 'react'
import { create } from 'react-test-renderer'
import UploadAvatar from '../upload-avatar'
import { mount } from 'enzyme'

describe('Upload-Avatar Component', () => {
  const comp = <UploadAvatar of="user" group={1} />

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should simulate change event on file', () => {
    const wrapper = mount(comp)

    // change event
    const file = new Blob(['foo'], {
      type: 'text/plain',
    })
    const mockedEvent = {
      target: {
        files: [file],
      },
    }
    wrapper.find('input[type="file"]').simulate('change', mockedEvent)

    // preview-avatar comp should be present since fileAvatarChanged=true
    expect(wrapper.find('PreviewAvatar').exists()).toBe(true)
  })
})
