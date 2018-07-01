import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import StickerComment, { PureStickerComment } from '../stickerComment'
import { shallow } from 'enzyme'

describe('ImageComment Component', () => {
  const mockFn = jest.fn()
  const props = {
    postDetails: {
      post_id: 44,
      when: 'feed',
      user: 7,
    },
    incrementComments: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <StickerComment {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Stickers/> and mock stickerComment when showStickers == true', () => {
    const wrapper = shallow(<PureStickerComment {...props} dispatch={mockFn} />)
    wrapper.setState({ showStickers: true })
    expect(wrapper.find('Stickers').exists()).toBe(true)
    wrapper.find('Stickers').prop('stickerSelected')()
  })
})
