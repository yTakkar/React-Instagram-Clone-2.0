import React from 'react'
import { Link } from 'react-router-dom'
import ToTags from '../../../hashtag/toTags/toTags'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'

const GroupBio = ({ gd }) => {
  let { group_id, bio, admin } = gd

  return (
    <div className='grp_bio'>
      <div className='grp_bio_h'>
        <span>Group's bio</span>
      </div>
      <div className='grp_bio_main'>
        {
          bio
            ? <span><ToTags str={bio} /></span>
            : <span className='no_grp_bio' >Group has no bio</span>
        }
        {
          Me(admin)
            ? <Link to={`/group/${group_id}/edit`} className='sec_btn grp_ns'>Not satisfied</Link>
            : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => (
  { gd: state.Group.group_details }
)

export default connect(mapStateToProps)(GroupBio)
