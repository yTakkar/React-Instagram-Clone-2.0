import React, { Component, Fragment } from 'react'
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

  modalBack = () => {
    this.setState({ showStickers: false })
    this.props.toggleOptions()
  }

  render() {
    let { showStickers } = this.state

    return (
      <Fragment>
        <li><a
          href='#'
          className='mssg_sticker'
          onClick={this.show}
        >Send sticker</a></li>

        {
          showStickers ?
            <Stickers
              type='message'
              back={this.modalBack}
              stickerMessage={sticker => this.message(sticker)}
            />
            : null
        }
      </Fragment>
    )
  }
}

StickerMessage.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}
