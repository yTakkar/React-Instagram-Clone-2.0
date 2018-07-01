import React from 'react'
import ToolTip from 'react-tooltip'
import GroupInfo from './info'
import GroupAvatar from './avatar'
import JoinGroup from './join'
import GroupTopOptions from './top-options/top-options'

const GroupBanner = () => {
  return (
    <div className="pro_banner">
      <div className="pro_top">
        <GroupTopOptions />
        <JoinGroup />
      </div>

      <GroupAvatar />
      <GroupInfo />

      <ToolTip />
    </div>
  )
}

export default GroupBanner
