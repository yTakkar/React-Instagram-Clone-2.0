import React from 'react'
import { create } from 'react-test-renderer'
import Avatars from '../avatars'
import AxiosAdaper from 'axios-mock-adapter'
import axios from 'axios'
import avatars from './avatars-mockArray'
import { shallow } from 'enzyme'

describe('Avatars Component', () => {
  const mockFn = () => {}
  const comp = (
    <Avatars
      back={mockFn}
      of='user'
      group={1}
    />
  )

  const mockAxios = new AxiosAdaper(axios)
  mockAxios
    .onPost('/api/get-avatars')
    .reply(200, avatars)

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call componentDidMount and get avatars', async () => {
    const wrapper = shallow(comp)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().avatars).toBeArrayOfSize(4)
    expect(wrapper.state().avatars)
      .toIncludeAnyMembers([ avatars[0] ])
  })

  it('should simulate click event for closing the modal', () => {
    const wrapper = shallow(comp)
    wrapper.find('.pro_ava_close').simulate('click')
  })

})
