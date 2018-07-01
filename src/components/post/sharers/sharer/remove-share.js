import React from 'react'
import { isAdmin } from '../../../../utils/admin-utils'
import { post } from 'axios'
import { removeShare } from '../../../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SecondaryButton from '../../../others/button/secondary-btn'

const RemoveShare = ({ share_id, decrementSharers, dispatch }) => {
  let remove = async e => {
    e.preventDefault()
    await post('/api/remove-share', { share_id })
    decrementSharers()
    dispatch(removeShare(share_id))
  }

  let btnLabel = `Remove ${isAdmin() ? 'as admin' : 'share'}`

  return <SecondaryButton label={btnLabel} onClick={remove} />
}

RemoveShare.propTypes = {
  share_id: PropTypes.number.isRequired,
  decrementSharers: PropTypes.func.isRequired,
}

export default connect()(RemoveShare)
export { RemoveShare as PureRemoveShare }
