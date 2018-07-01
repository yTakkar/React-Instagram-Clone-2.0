import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { messageScroll } from '../../../utils/message-utils'
import { connect } from 'react-redux'
import {
  getConversationMessages,
  readConversation,
  getConDetails,
} from '../../../actions/message'
import MapMessages from './message/map-messages'
import TextMessage from './bottom/text-message'
import ConversationTop from './top/con-top'
import PropTypes from 'prop-types'
import d from '../../../utils/API/DOM'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'

class Conversation extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      con: { con_id, unreadMssgs },
    } = this.props
    dispatch(getConDetails(con_id))
    dispatch(getConversationMessages(con_id))
    dispatch(readConversation(con_id, unreadMssgs))
    messageScroll()
  }

  componentWillReceiveProps = async ({ dispatch, con: nextPropsCon }) => {
    let { con_id, unreadMssgs } = nextPropsCon
    let { con } = this.props
    if (con_id != con.con_id) {
      new d('.send_mssg').focus()
      dispatch(getConDetails(con_id))
      dispatch(getConversationMessages(con_id))
      dispatch(readConversation(con_id, unreadMssgs))
    }
    this.setState({ loading: false })
  }

  componentDidUpdate = () => messageScroll()

  render() {
    let { loading } = this.state
    let { hideConversation } = this.props

    return (
      <div>
        <IsLoading loading={loading} />

        <div className={classNames('mssg_messages', cLoading(loading))}>
          <FadeIn duration="300ms">
            <ConversationTop hideConversation={hideConversation} />
            <MapMessages />

            <div className="m_m_bottom">
              <TextMessage />
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }
}

Conversation.propTypes = {
  con: PropTypes.shape({
    con_id: PropTypes.number.isRequired,
    unreadMssgs: PropTypes.number.isRequired,
  }).isRequired,
  hideConversation: PropTypes.func.isRequired,
}

export default connect()(Conversation)
export { Conversation as PureConversation }
