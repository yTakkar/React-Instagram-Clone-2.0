import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FAIcon from '../../others/icons/font-awesome-icon'

const GroupInfo = ({ gd }) => {
  let { name, group_type } = gd

  return (
    <div className='pro_info'>
      <div className='pro_username'>
        <Link to='#' className='username'>{name}</Link>
      </div>
      <div className='pro_name'>
        {
          group_type == 'public' ?
            <span><FAIcon icon='globe' /> Public group</span>
            : <span><FAIcon icon='lock' /> Private group</span>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => (
  { gd: state.Group.group_details }
)

export default connect(mapStateToProps)(GroupInfo)
