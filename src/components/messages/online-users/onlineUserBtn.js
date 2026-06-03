import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import OnlineUsers from './onlineUsers'
import { t } from '../../../utils/translation'

class OnlineUsersButton extends Component {
  state = {
    showOnlineUsers: false,
  }

  toggleOnlineUsers = e => {
    e ? e.preventDefault() : null
    this.setState({ showOnlineUsers: !this.state.showOnlineUsers })
  }

  render() {
    let { showOnlineUsers } = this.state
    let { lang } = this.props

    return (
      <Fragment>
        <a href="#" className="pri_btn" onClick={this.toggleOnlineUsers}>
          <i className="fas fa-globe" />
          <span>{t(lang, 'messages', 'onlineUsers')}</span>
        </a>

        {showOnlineUsers && (
          <OnlineUsers back={this.toggleOnlineUsers} />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(OnlineUsersButton)
export { OnlineUsersButton as PureOnlineUsersButton }
