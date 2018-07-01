import React from 'react'
import { FadeIn } from 'animate-components'
import { humanReadable } from '../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const NotiSpeak = ({ un, session }) => {
  let { id, username } = session

  return (
    <div>
      {un != 0 ? (
        <div className="noti_speak">
          <FadeIn duration="300ms">
            <img src={`/users/${id}/avatar.jpg`} />

            <div className="n_s_sn_div">
              <span>
                <b>@{username}</b>, you got {humanReadable(un, 'notification')}.
              </span>
            </div>
          </FadeIn>
        </div>
      ) : null}
    </div>
  )
}

NotiSpeak.propTypes = {
  un: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  session: state.User.session,
})

export default connect(mapStateToProps)(NotiSpeak)
