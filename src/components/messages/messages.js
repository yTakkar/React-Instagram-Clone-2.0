import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { getUnreadNotifications } from '../../actions/notification'
import { getConversations } from '../../actions/message'
import { connect } from 'react-redux'
import Nothing from '../others/nothing'
import Conversation from './conversation/conversation'
import OnlineUsersButton from './online-users/onlineUserBtn'
import NewConversation from './newConversation'
import MapConversations from './map-conversations/map-conversations'
import IsLoading from '../others/isLoading'
import { cLoading } from '../../utils/utils'
import classNames from 'classnames'

class Messages extends Component {
  state = {
    loading: true,
    showConversation: false,
    selectedCon: {
      con_id: null,
      unreadMssgs: 0, // for updating total unread mssgs
    },
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getConversations())
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { loading, showConversation, selectedCon } = this.state

    return (
      <div>
        <IsLoading loading={loading} when="page" />

        <Title value="Messages" />

        <FadeIn
          duration="300ms"
          className={classNames('messages_senapati', cLoading(loading))}
        >
          <div className="mssg_left">
            <div className="mssg_new">
              <OnlineUsersButton />
              <NewConversation />
            </div>

            {/* CONVERSATIONS */}
            <MapConversations
              showConversation={con => {
                this.setState({
                  selectedCon: con,
                  showConversation: true,
                })
              }}
            />
          </div>

          <div className="mssg_right">
            {/* SHOW CONVERSATION */}
            {showConversation ? (
              <Conversation
                con={selectedCon}
                hideConversation={() =>
                  this.setState({ showConversation: false })
                }
              />
            ) : (
              <div style={{ marginTop: 77 }}>
                <Nothing mssg="Please select a conversation" />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
})

export default connect(mapStateToProps)(Messages)
export { Messages as PureMessages }
