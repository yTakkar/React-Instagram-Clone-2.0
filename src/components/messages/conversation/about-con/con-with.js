import React from 'react'
import { connect } from 'react-redux'
import { humanReadable } from '../../../../utils/utils'
import AppLink from '../../../others/link/link'

const ConversationWith = ({ cd, conAbout }) => {
  let { mutualFollowersCount } = conAbout
  let {
    con_with: user,
    con_with_username: username,
    con_with_firstname: firstname,
    con_with_surname: surname,
  } = cd

  return (
    <div className="sli_with_div">
      <span className="sli_label">Conversation with</span>

      <div className="sli_with">
        <img src={`/users/${user}/avatar.jpg`} />

        <div className="sli_with_cont">
          <AppLink url={`/profile/${username}`} label={username} />

          <span className="sli_w">
            {mutualFollowersCount == 0
              ? `${firstname} ${surname}`
              : humanReadable(mutualFollowersCount, 'mutual follower')}
          </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToPros = state => ({
  conAbout: state.Message.conAbout,
  cd: state.Message.conDetails,
})

export default connect(mapStateToPros)(ConversationWith)
