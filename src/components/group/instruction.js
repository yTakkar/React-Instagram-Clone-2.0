import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bool } from 'prop-types'

const GroupInstruction = ({ showBtns }) => (
  <div className='sabout_one'>
    <img src='/images/tree.png' />
    <div className='sabout_one_info'>
      <span>Update or edit group to make it look more attractive</span>
      {
        showBtns ?
          <Fragment>
            <Link to='/' className='sec_btn'>Update group</Link>
            <Link to='/edit-profile' className='pri_btn'>Edit group</Link>
          </Fragment>
          : null
      }
    </div>
  </div>
)

GroupInstruction.defaultProps = {
  showBtns: true
}

GroupInstruction.propTypes = {
  showBtns: bool
}

export default GroupInstruction
