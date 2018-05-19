import React, { Component, Fragment } from 'react'
import Overlay from '../../../../others/overlay'
import AboutConversation from '../../about-con/about-con'
import PropTypes from 'prop-types'

export default class ConversationShowMore extends Component {

  state = {
    showMore: false
  }

  show = e => {
    e.preventDefault()
    this.setState({ showMore: true })
  }

  render() {
    let { showMore } = this.state
    let { toggleOptions } = this.props

    return (
      <Fragment>
        <li><a
          href='#'
          className='m_m_info'
          onClick={this.show}
        >More</a></li>

        {
          showMore ?
            <Fragment>
              <Overlay/>
              <AboutConversation
                back={() => {
                  this.setState({ showMore: false })
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

ConversationShowMore.propTypes = {
  toggleOptions: PropTypes.func.isRequired
}
