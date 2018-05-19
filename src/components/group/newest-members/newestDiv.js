import React from 'react'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FAIcon from '../../others/icons/font-awesome-icon'

const NewestDiv = ({ group, newestMembers }) => {
  let map_members = newestMembers.map(u =>
    <Link
      key={u.user}
      to={`/profile/${u.username}`}
      data-tip={u.username}
      className='mutual_links'
    >
      <img src={`/users/${u.user}/avatar.jpg`} />
    </Link>
  )

  return (
    <div className='mutuals'>
      <div className='mutual_info'>
        <span>Newest members</span>
        <Link to={`/group/${group}/members`} data-tip='view all' className='view_all_yk'>
          <FAIcon icon='chevron-right' />
        </Link>
      </div>
      <div className='mutual_main'>
        { map_members }
      </div>
      <ToolTip/>
    </div>

  )
}

NewestDiv.propTypes = {
  group: PropTypes.number
}

const mapStateToProps = state => (
  { newestMembers: state.Group.newestMembers }
)

export default connect(mapStateToProps)(NewestDiv)
