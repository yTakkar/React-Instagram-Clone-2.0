import React from 'react'
import { Link } from 'react-router-dom'

const UpdateInstruction = () => (
  <div className='sabout_one'>
    <img src='/images/tree.png' />

    <div className='sabout_one_info'>
      <span>
        Update or edit you profile to make it look more attractive
      </span>

      <Link
        to='/'
        className='sec_btn'
      >Update profile</Link>
      <Link
        to='/edit-profile'
        className='pri_btn'
      >Edit profile</Link>
    </div>

  </div>
)

export default UpdateInstruction
