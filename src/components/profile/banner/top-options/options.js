import React, { Fragment } from 'react'
import BannerRemoveUser from './removeUser'
import BannerMessageUser from './messageUser'
import BannerAddToFavs from './addToFavs'
import BannerBlockUser from './blockUser'
import BannerRecommendUser from './recommendUser'
import PropTypes from 'prop-types'
import CopyLink from '../../../others/copyLink'

const BannerOptions = ({ toggleOptions }) => (
  <Fragment>
    <ul>
      <BannerBlockUser toggleOptions={toggleOptions} />
      <BannerRecommendUser toggleOptions={toggleOptions} />
      <BannerAddToFavs toggleOptions={toggleOptions} />
      <BannerMessageUser toggleOptions={toggleOptions} />
      <BannerRemoveUser />
      <CopyLink
        url={location.href}
        label="Copy profile link"
        done={toggleOptions}
      />
    </ul>
  </Fragment>
)

BannerOptions.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

export default BannerOptions
