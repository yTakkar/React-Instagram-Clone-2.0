import React, { Component, Fragment } from 'react'
import Prompt from '../../../../others/prompt'
import { deleteYourMssgs } from '../../../../../utils/message-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class UnsendMessages extends Component {
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

  modalBack = () => {
    this.setState({ unsend: false })
    this.props.toggleOptions()
  }

  render() {
    let { unsend } = this.state
    let { messages } = this.props

    return (
      <Fragment>
        {messages.length != 0 && (
          <li>
            <a href="#" className="dlt_mssgs" onClick={this.showPrompt}>
              Unsend your mssgs
            </a>
          </li>
        )}

        {unsend && (
          <Prompt
            title="Unsend all your messages"
            content="All your messages will be deleted. There's no undo so you won't be able to find it."
            actionText="Delete"
            action={this.unsendAllMssgs}
            back={this.modalBack}
          />
        )}
      </Fragment>
    )
  }
}

UnsendMessages.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  con_id: store.Message.conDetails.con_id,
  messages: store.Message.messages,
})

export default connect(mapStateToProps)(UnsendMessages)
export { UnsendMessages as PureUnsendMessages }
