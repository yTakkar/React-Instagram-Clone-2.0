import React from 'react'
import { isAdmin } from '../../../../utils/admin-utils'
import { post } from 'axios'
import { untag } from '../../../../actions/post'
import Notify from 'handy-notification'
import { connect } from 'react-redux'
import { number, func } from 'prop-types'
import SecondaryButton from '../../../others/button/secondary-btn'

const Untag = ({ post_id, user, decrementTags, dispatch }) => {
  let untagUser = async e => {
    e.preventDefault()
    await post('/api/untag', { user, post: post_id })
    dispatch(untag(user))
    decrementTags()
    Notify({ value: 'Untagged!!' })
  }

  let btnLabel = `Untag ${isAdmin() ? 'as admin' : ''}`

  return <SecondaryButton label={btnLabel} onClick={untagUser} />
}

Untag.propTypes = {
  post_id: number.isRequired,
  user: number.isRequired,
  decrementTags: func.isRequired,
}

export default connect()(Untag)
export { Untag as PureUntag }
