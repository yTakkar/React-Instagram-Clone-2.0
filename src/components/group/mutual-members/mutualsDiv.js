import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FAIcon from '../../others/icons/font-awesome-icon'

const MutualMembersDiv = ({ group, mutualMembers }) => {

  let map_mutuals = mutualMembers.map(u =>
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
        <span>Members you know</span>
        <Link 
          to={`/group/${group}/members`} 
          data-tip='view all' 
          className='view_all_yk'
        >
          <FAIcon icon='chevron-right' />
        </Link>
      </div>
      <div className='mutual_main'>
        { map_mutuals }
      </div>
      <ToolTip/>
    </div>
  )
}

MutualMembersDiv.propTypes = {
  group: PropTypes.number
}

const mapStateToProps = state => (
  { mutualMembers: state.Group.mutualMembers }
)

export default connect(mapStateToProps)(MutualMembersDiv)
