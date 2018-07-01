import React from 'react'
import { connect } from 'react-redux'
import FAIcon from '../../others/icons/font-awesome-icon'
import AppLink from '../../others/link/link'

const GroupInfo = ({ gd }) => {
  let { group_id, name, group_type } = gd

  return (
    <div className="pro_info">
      <div className="pro_username">
        <AppLink url={`/group/${group_id}`} label={name} className="username" />
      </div>
      <div className="pro_name">
        {group_type == 'public' ? (
          <span>
            <FAIcon icon="globe" /> Public group
          </span>
        ) : (
          <span>
            <FAIcon icon="lock" /> Private group
          </span>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  gd: state.Group.group_details,
})

export default connect(mapStateToProps)(GroupInfo)
