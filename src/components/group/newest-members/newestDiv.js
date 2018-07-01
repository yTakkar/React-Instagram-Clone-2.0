import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FAIcon from '../../others/icons/font-awesome-icon'
import AppLink from '../../others/link/link'

const NewestMembersDiv = ({ group, newestMembers }) => {
  let map_members = newestMembers.map(u => (
    <AppLink
      key={u.user}
      url={`/profile/${u.username}`}
      data-tip={u.username}
      className="mutual_links"
    >
      <img src={`/users/${u.user}/avatar.jpg`} />
    </AppLink>
  ))

  return (
    <div className="mutuals">
      <div className="mutual_info">
        <span>Newest members</span>

        <AppLink
          url={`/group/${group}/members`}
          data-tip="view all"
          className="view_all_yk"
        >
          <FAIcon icon="chevron-right" />
        </AppLink>
      </div>

      <div className="mutual_main">{map_members}</div>

      <ToolTip />
    </div>
  )
}

NewestMembersDiv.propTypes = {
  group: PropTypes.number,
}

const mapStateToProps = state => ({
  newestMembers: state.Group.newestMembers,
})

export default connect(mapStateToProps)(NewestMembersDiv)
