import React, { Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import { Me } from '../../../../../utils/utils'
import { connect } from 'react-redux'
import { post } from 'axios'
import { removeFavourites } from '../../../../../actions/follow'
import Notify from 'handy-notification'
import PropTypes from 'prop-types'
import SecondaryButton from '../../../../others/button/secondary-btn'

const RemoveFav = ({ fav_id, username, id, dispatch }) => {
  let removeFav = async e => {
    e.preventDefault()
    let {
      data: { success, mssg },
    } = await post('/api/remove-favourites', { fav_id })

    if (success) {
      dispatch(removeFavourites(fav_id))
      Notify({ value: `Removed ${username} from favourites!!` })
    } else {
      Notify({ value: mssg })
    }
  }

  let btnLabel = `Remove ${isAdmin() ? 'as admin' : ''}`

  return (
    <Fragment>
      {Me(id) || isAdmin() ? (
        <SecondaryButton label={btnLabel} onClick={removeFav} />
      ) : null}
    </Fragment>
  )
}

RemoveFav.propTypes = {
  fav_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  id: state.User.user_details.id,
})

export default connect(mapStateToProps)(RemoveFav)
export { RemoveFav as PureRemoveFav }
