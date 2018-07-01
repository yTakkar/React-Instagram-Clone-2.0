import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import StickerMessage, { PureStickerMessage } from '../stickerMessage'
import { shallow } from 'enzyme'
import Message from '../../../../../../store/__mocks__/reducers/Message'

describe('StickerMessage Component', () => {
  const mockFn = jest.fn()
  const props = {
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <StickerMessage {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Stickers/> when showStickers == true', () => {
    const wrapper = shallow(
      <PureStickerMessage {...props} cd={Message.conDetails} />
    )
    wrapper.find('.mssg_sticker').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Stickers').exists()).toBe(true)
  })

  it('should mock stickerMessage when sticker is selected', () => {
    const wrapper = shallow(
      <PureStickerMessage {...props} cd={Message.conDetails} />
    )
    wrapper.setState({ showStickers: true })
    wrapper.find('Stickers').prop('stickerSelected')()
  })
})
