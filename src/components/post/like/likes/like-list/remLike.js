import React, { Fragment } from 'react'
import { removeLike } from '../../../../../actions/post'
import Notify from 'handy-notification'
import { connect } from 'react-redux'
import SecondaryButton from '../../../../others/button/secondary-btn'
import { number, func } from 'prop-types'

const RemoveLikeAsAdmin = ({ like_id, decrementLikes, dispatch }) => {
  let remLikeAsAdmin = e => {
    e.preventDefault()
    dispatch(removeLike(like_id))
    decrementLikes()
    Notify({ value: 'Removed like as admin!!' })
  }

  return (
    <Fragment>
      <SecondaryButton label="Remove as admin" onClick={remLikeAsAdmin} />
    </Fragment>
  )
}

RemoveLikeAsAdmin.propTypes = {
  like_id: number.isRequired,
  decrementLikes: func.isRequired,
}

export default connect()(RemoveLikeAsAdmin)
export { RemoveLikeAsAdmin as PureRemoveLikeAsAdmin }
