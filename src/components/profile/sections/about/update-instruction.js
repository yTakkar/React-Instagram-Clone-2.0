import React from 'react'
import AppLink from '../../../others/link/link'

const UpdateInstruction = () => (
  <div className="sabout_one">
    <img src="/images/tree.png" />

    <div className="sabout_one_info">
      <span>Update or edit you profile to make it look more attractive</span>

      <AppLink url="/" className="sec_btn" label="Update profile" />
      <AppLink url="/edit-profile" className="pri_btn" label="Edit profile" />
    </div>
  </div>
)

export default UpdateInstruction
