import React, { Component, Fragment } from 'react'
import Emojis from './emojis'
import { shape, number, string, func, bool } from 'prop-types'
import ToolTip from 'react-tooltip'
import MaterialIcon from '../icons/material-icon'
import classNames from 'classnames'

export default class AddEmojis extends Component {
  state = {
    showEmojis: false,
  }

  toggleEmojis = () => this.setState({ showEmojis: !this.state.showEmojis })

  render() {
    let { showEmojis } = this.state
    let {
      position,
      textArea,
      updateTextArea,
      recenterEmojis,
      disabled,
      addClassOnClicked,
      className,
    } = this.props

    let addClass = addClassOnClicked && showEmojis ? className : ''
    let disabledClass = disabled ? 'emoji_disabled' : ''

    return (
      <Fragment>
        <span
          className={classNames('emoji_span', disabledClass, addClass)}
          data-tip="Add emojis"
          onClick={this.toggleEmojis}
        >
          <MaterialIcon icon="sentiment_very_satisfied" />
        </span>

        {showEmojis ? (
          <Emojis
            position={position}
            textArea={textArea}
            updateStateValue={value => updateTextArea(value)}
            recenterEmojis={recenterEmojis}
          />
        ) : null}

        <ToolTip />
      </Fragment>
    )
  }
}

AddEmojis.defaultProps = {
  recenterEmojis: false,
  disabled: false,
  addClassOnClicked: false,
}

AddEmojis.propTypes = {
  position: shape({
    top: number.isRequired,
    left: number.isRequired,
  }).isRequired,
  textArea: string.isRequired,
  updateTextArea: func.isRequired,
  recenterEmojis: bool,
  disabled: bool,
  addClassOnClicked: bool,
  className: string,
}
