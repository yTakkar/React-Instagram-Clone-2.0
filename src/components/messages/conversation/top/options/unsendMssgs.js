import React, { Component, Fragment } from 'react'
import Prompt from '../../../../others/prompt'
import Overlay from '../../../../others/overlay'
import { deleteYourMssgs } from '../../../../../utils/message-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect(store => (
  {
    con_id: store.Message.conDetails.con_id,
    messages: store.Message.messages
  }
))

export default class UnsendMessages extends Component {

  state = {
    unsend: false,
  }

  showPrompt = e => {
    e.preventDefault()
    this.setState({ unsend: true })
  }

  unsendAllMssgs = e => {
    e.preventDefault()
    let { dispatch, con_id, toggleOptions } = this.props
    toggleOptions()
    deleteYourMssgs({ con_id, dispatch })
    this.setState({ unsend: false })
  }

  render() {
    let { unsend } = this.state
    let { toggleOptions, messages } = this.props

    return (
      <Fragment>
        {
          messages.length != 0  ?
            <li><a
              href='#'
              className='dlt_mssgs'
              onClick={this.showPrompt}
            >Unsend your mssgs</a></li>
            : null
        }

        {
          unsend ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Unsend all your messages'
                content="All your messages will be deleted. There's no undo so you won't be able to find it."
                actionText='Delete'
                action={this.unsendAllMssgs}
                back={() => {
                  this.setState({ unsend: false })
                  toggleOptions()
                }}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

UnsendMessages.propTypes = {
  toggleOptions: PropTypes.func.isRequired
}
