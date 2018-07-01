import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FadeIn } from 'animate-components'

const MapSFUsers = ({ followings, selectUser }) => {
  let map_f = followings.map(f => (
    <li
      className="tag_hmm"
      key={f.follow_to}
      onClick={() => selectUser(f.follow_to, f.follow_to_username)}
    >
      <img src={`/users/${f.follow_to}/avatar.jpg`} />
      <span>{f.follow_to_username}</span>
    </li>
  ))

  return (
    <Fragment>
      {followings.length > 0 ? (
        <div className="p_tagging_list">
          <div className="p_tagging_wrapper">
            <ul className="p_tagging_ul">
              <FadeIn duration="200ms">{map_f}</FadeIn>
            </ul>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

MapSFUsers.propTypes = {
  followings: PropTypes.arrayOf(
    PropTypes.shape({
      follow_to: PropTypes.number,
      follow_to_username: PropTypes.string,
    })
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
}

export default MapSFUsers
