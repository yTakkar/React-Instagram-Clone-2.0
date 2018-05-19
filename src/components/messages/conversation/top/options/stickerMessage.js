import React, { Component, Fragment } from 'react'
import Overlay from '../../../../others/overlay'
import Stickers from '../../../../others/stickers/stickers'
import { stickerMessage } from '../../../../../utils/message-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect(store => (
  { cd: store.Message.conDetails }
))

export default class StickerMessage extends Component {

  state = {
    showStickers: false,
  }

  show = e => {
    e.preventDefault()
    this.setState({ showStickers: true })
  }

  message = sticker => {
    let {
      cd: { con_id, con_with },
      toggleOptions, dispatch
    } = this.props
    stickerMessage({ con_id, con_with, sticker, dispatch })
    toggleOptions()
  }

  render() {
    let { showStickers } = this.state
    let { toggleOptions } = this.props

    return (
      <Fragment>
        <li><a
          href='#'
          className='mssg_sticker'
          onClick={this.show}
        >Send sticker</a></li>

        {
          showStickers ?
            <Fragment>
              <Overlay/>
              <Stickers
                type='message'
                back={() => {
                  this.setState({ showStickers: false })
                  toggleOptions()
                }}
                stickerMessage={sticker => this.message(sticker)}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

StickerMessage.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}
