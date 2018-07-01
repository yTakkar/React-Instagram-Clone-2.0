import React, { Component, Fragment } from 'react'
import Emojis from '../../../others/emojis/emojis'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../others/icons/material-icon'
import ToolTip from 'react-tooltip'

export default class ConversationAddEmojis extends Component {
  state = {
    showEmojis: false,
  }

  toggleEmojis = () => this.setState({ showEmojis: !this.state.showEmojis })

  render() {
    let { showEmojis } = this.state
    let { updateMssgValue } = this.props

    return (
      <Fragment>
        <span
          className="mssg_emoji_btn"
          data-tip="Add emojis"
          onClick={this.toggleEmojis}
        >
          <MaterialIcon icon="sentiment_very_satisfied" />
        </span>

        {showEmojis && (
          <Emojis
            position={{ top: 308, left: 750 }}
            textArea=".send_mssg"
            updateStateValue={value => updateMssgValue(value)}
          />
        )}

        <ToolTip />
      </Fragment>
    )
  }
}

ConversationAddEmojis.propTypes = {
  updateMssgValue: PropTypes.func.isRequired,
}
