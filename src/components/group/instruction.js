import React, { Fragment } from 'react'
import { bool } from 'prop-types'
import AppLink from '../others/link/link'

const GroupInstruction = ({ showBtns }) => (
  <div className="sabout_one">
    <img src="/images/tree.png" />
    <div className="sabout_one_info">
      <span>Update or edit group to make it look more attractive</span>
      {showBtns && (
        <Fragment>
          <AppLink url="/" className="sec_btn" label="Update group" />
          <AppLink url="/edit-profile" className="pri_btn" label="Edit group" />
        </Fragment>
      )}
    </div>
  </div>
)

GroupInstruction.defaultProps = {
  showBtns: true,
}

GroupInstruction.propTypes = {
  showBtns: bool,
}

export default GroupInstruction
