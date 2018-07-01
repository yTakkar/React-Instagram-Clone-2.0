import React from 'react'
import Stickers from '../stickers'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'
import stickers from './stickers-mockArray'
import { mockAxiosRequest } from '../../../../utils/__mocks__/mock-axios'
import stickersMockArray from './stickers-mockArray'

describe('Stickers Component', () => {
  const mockFn = jest.fn()
  const comp = <Stickers back={mockFn} stickerSelected={mockFn} />

  mockAxiosRequest('get-stickers', stickersMockArray)

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading=false', () => {
    const wrapper = shallow(comp)
    wrapper.setState({ loading: false })

    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

  it('should get stickers from API in componentDidMount', async () => {
    const wrapper = shallow(comp)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().stickers).toBeArray()
    expect(wrapper.state().stickers).toIncludeAnyMembers([stickers[0]])
  })

  it('should perform some click actions', async () => {
    const wrapper = shallow(comp)
    await wrapper.instance().componentDidMount()

    wrapper.setState({
      loading: false,
      // we assume first sticker is selected and it's file path is return by stickerSelected prop
      selectedSticker: wrapper.state().stickers[0],
    })

    wrapper.find('ModalBack').simulate('click')
    wrapper.find('PrimaryButton').simulate('click', { preventDefault() {} })
  })
})
