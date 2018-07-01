import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ConversationTeaser from './conversation-teaser'
import { FadeIn } from 'animate-components'
import Nothing from '../../others/nothing'
import { humanReadable } from '../../../utils/utils'
import PropTypes from 'prop-types'
import d from '../../../utils/API/DOM'

const MapConversations = ({ showConversation, conversations }) => {
  let selectConversation = con => {
    new d('.mssg_sr').removeClass('mssg_sr_toggle')
    new d(`.mt_${con.con_id}`).addClass('mssg_sr_toggle')
    showConversation(con)
  }

  let conLen = conversations.length
  let map_conversations = conversations.map(c => (
    <ConversationTeaser
      key={c.con_id}
      {...c}
      select={() =>
        selectConversation({
          con_id: c.con_id,
          unreadMssgs: c.unreadMssgs,
        })
      }
    />
  ))

  return (
    <Fragment>
      <span className="con_count">{humanReadable(conLen, 'conversation')}</span>

      {conLen == 0 ? (
        <Nothing conPage mssg="No conversations" />
      ) : (
        <FadeIn duration="300ms">{map_conversations}</FadeIn>
      )}
    </Fragment>
  )
}

MapConversations.propTypes = {
  showConversation: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  conversations: state.Message.conversations,
})

export default connect(mapStateToProps)(MapConversations)
export { MapConversations as PureMapConversations }
