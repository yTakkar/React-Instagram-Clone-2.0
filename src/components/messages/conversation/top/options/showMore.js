import React, { Component, Fragment } from 'react'
import AboutConversation from '../../about-con/about-con'
import PropTypes from 'prop-types'

export default class ConversationShowMore extends Component {
  state = {
    showMore: false,
  }

  show = e => {
    e.preventDefault()
    this.setState({ showMore: true })
  }

  modalBack = () => {
    this.setState({ showMore: false })
    this.props.toggleOptions()
  }

  render() {
    let { showMore } = this.state

    return (
      <Fragment>
        <li>
          <a href="#" className="m_m_info" onClick={this.show}>
            More
          </a>
        </li>

        {showMore && <AboutConversation back={this.modalBack} />}
      </Fragment>
    )
  }
}

ConversationShowMore.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}
