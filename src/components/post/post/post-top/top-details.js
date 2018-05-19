import React, { Fragment } from 'react'
import { shortener } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../others/icons/material-icon'

const PostTopDetails = ({ details }) => {
  let {
    user, username, firstname, surname, group_id, group_name, type, location
  } = details

  return (
    <Fragment>
      <div className='p_i_img'>
        <img src={`/users/${user}/avatar.jpg`} />
      </div>
      <div
        className='p_i_1'
        style={{ top: type == 'group' ? -8 : 'inherit' }}
      >
        <Link
          to={`/profile/${username}`}
          title={username}
        >{username}</Link>
        {
          type == 'group' ?
            <div className='its_grp_post' >
              <span className='to_grp_arrow'>
                <MaterialIcon icon='arrow_drop_up' />
              </span>
              <Link
                to={`/group/${group_id}`}
                className='to_grp_name'
              >{group_name}</Link>
            </div>
            : null
        }
        <span
          className='p_i_1_title'
          title={location ? location : null}
        >
          {
            location
              ? shortener(location, 35)
              : `${firstname} ${surname}`
          }
        </span>
      </div>
    </Fragment>
  )
}

PostTopDetails.propTypes = {
  details: PropTypes.shape({
    user: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    group_id: PropTypes.number,
    group_name: PropTypes.string,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired
}

export default PostTopDetails
