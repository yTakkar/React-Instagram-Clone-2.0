import React from 'react'
import MapStickers from '../map-stickers'
import { create } from 'react-test-renderer'
import stickers from './stickers-mockArray'
import { shallow } from 'enzyme'

describe('Map-Stickers Component', () => {
  const props = {
    stickers,
    selectSticker() {},
  }

  it('should match snapshot', () => {
    const tree = create(<MapStickers {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should simulate click event on the first sticker and return it's file path", () => {
    let selectedSticker = ''
    const wrapper = shallow(
      <MapStickers
        {...props}
        selectSticker={sticker => (selectedSticker = sticker)}
      />
    )

    wrapper
      .find('img.sti_img')
      .first()
      .simulate('click')
    expect(selectedSticker).toEqual(stickers[0])
  })
})
