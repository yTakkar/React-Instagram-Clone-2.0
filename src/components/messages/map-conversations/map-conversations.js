import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ConversationTeaser from './conversation-teaser'
import { FadeIn } from 'animate-components'
import Nothing from '../../others/nothing'
import PropTypes from 'prop-types'
import d from '../../../utils/API/DOM'
import { t } from '../../../utils/translation'

const MapConversations = ({ showConversation, conversations, lang }) => {
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
      <span className="con_count">{conLen} {t(lang, 'messages', 'conversations')}</span>

      {conLen == 0 ? (
        <Nothing conPage mssg={t(lang, 'messages', 'noConversations')} />
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
  lang: state.Language.language
})

export default connect(mapStateToProps)(MapConversations)
export { MapConversations as PureMapConversations }
