import React, { Fragment } from 'react'
import { removeLike } from '../../../../../store/actions/post-a'
import Notify from 'handy-notification'
import { connect } from 'react-redux'
import SecondaryButton from '../../../../others/button/secondary-btn'

const RemoveLikeAsAdmin = ({ like_id, decrementLikes, dispatch }) => {

  let remLikeAsAdmin = e => {
    e.preventDefault()
    dispatch(removeLike(like_id))
    decrementLikes()
    Notify({ value: 'Removed like as admin!!' })
  }

  return (
    <Fragment>
      <SecondaryButton
        label='Remove as admin'
        onClick={remLikeAsAdmin}
      />
    </Fragment>
  )
}

export default connect()(RemoveLikeAsAdmin)
