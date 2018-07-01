import React, { Fragment } from 'react'
import { e_v } from '../../utils/utils'
import { resend_vl } from '../../utils/edit-profile-utils'
import SecondaryButton from '../others/button/secondary-btn'

const ResendVL = () => {
  let resend = e => {
    e.preventDefault()
    resend_vl()
  }

  return (
    <Fragment>
      {!e_v() && (
        <SecondaryButton
          label="Resend verification link"
          onClick={resend}
          extraClass="resend_vl"
        />
      )}
    </Fragment>
  )
}

export default ResendVL
