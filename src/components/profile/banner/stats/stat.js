import React, { Fragment } from 'react'
import { c_first } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppLink from '../../../others/link/link'

const BannerStat = ({ username, disabled, statType, statValue }) => {
  let body = (
    <Fragment>
      <span className="pro_hg">{statValue}</span>
      <span className="pro_nhg">{c_first(statType)}</span>
    </Fragment>
  )
  let url = `/profile/${username}/${statType}`

  return (
    <Fragment>
      {disabled ? (
        <div className="pro_post stat_disabled">{body}</div>
      ) : (
        <AppLink url={url}>{body}</AppLink>
      )}
    </Fragment>
  )
}

BannerStat.defaaultProps = {
  disabled: false,
}

BannerStat.propTypes = {
  disabled: PropTypes.bool,
  statType: PropTypes.string.isRequired,
  statValue: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  username: state.User.user_details.username,
})

export default connect(mapStateToProps)(BannerStat)
