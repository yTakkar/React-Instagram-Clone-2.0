import React from 'react'
import { Link } from 'react-router-dom'
import { shape, string } from 'prop-types'

const ModalItemInfo = ({ info }) => {
  let { username, firstname, surname } = info

  return (
    <div className='modal_it_info'>
      <Link
        to={`/profile/${username}`}
        className='modal_it_username'
      >{username}</Link>
      <span
        className='modal_it_light'
      >{`${firstname} ${surname}`}</span>
    </div>
  )
}

ModalItemInfo.propTypes = {
  info: shape({
    username: string.isRequired,
    firstname: string.isRequired,
    surname: string.isRequired
  }).isRequired
}

export default ModalItemInfo
