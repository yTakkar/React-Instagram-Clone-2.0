import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Spinner from './spinner'
import { post } from 'axios'
import $ from 'jquery'

export default class Stickers extends React.Component {

  state = {
    stickers: [],
    loading: true,
    selectedSticker: ''
  }

  componentDidMount = async () => {
    let { data: stickers } = await post('/api/get-stickers')
    this.setState({ stickers, loading: false })
  }

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  selectSticker = e => {
    let sticker = $(`[data-sticker="sticker-${e}"]`)
    sticker.siblings().removeClass('sti_img_active')
    sticker.addClass('sti_img_active')
    $('.btn_select_sticker').focus()
    this.setState({ selectedSticker: e })
  }

  chooseSticker = async e => {
    e.preventDefault()
    $('.btn_select_sticker').addClass('a_disabled')

    let
      { selectedSticker } = this.state,
      { type, back, stickerComment, stickerMessage } = this.props

    if (type == 'comment') {
      stickerComment(selectedSticker)
    } else {
      stickerMessage(selectedSticker)
    }

    back()
  }

  render() {
    let
      { loading, stickers } = this.state,
      map_stickers = stickers.map(s =>
        <img
          key={s}
          src={`/images/stickers/${s}`} className='sti_img'
          data-sticker={`sticker-${s}`}
          onClick={() => this.selectSticker(s)}
        />
      )

    return (
      <div class='stickers_modal modal modal_big' >

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Choose a Sticker</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { map_stickers }
            </div>

          </Scrollbars>

          <div className='modal_bottom'>
            <a href='#' className='sec_btn' onClick={this.back} >Back</a>
            <a
              href='#'
              className={`pri_btn btn_select_sticker ${loading ? 'a_disabled' : ''}`}
              onClick={this.chooseSticker}
            >Choose</a>
          </div>
        </FadeIn>

      </div>
    )
  }
}
