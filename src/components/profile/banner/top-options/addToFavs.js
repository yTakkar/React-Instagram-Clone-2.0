import React, { Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToFavourites } from '../../../../utils/user-interact-utils'

const BannerAddToFavs = ({ id, toggleOptions }) => {
  let addToFavs = e => {
    e.preventDefault()
    toggleOptions()
    addToFavourites(id)
  }

  return (
    <Fragment>
      {!Me(id) && (
        <li>
          <a href="#" className="add_fav" onClick={addToFavs}>
            Add to favourites
          </a>
        </li>
      )}
    </Fragment>
  )
}

BannerAddToFavs.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  id: state.User.user_details.id,
})

export default connect(mapStateToProps)(BannerAddToFavs)
export { BannerAddToFavs as PureBannerAddToFavs }
