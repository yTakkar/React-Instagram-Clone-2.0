import React, { Fragment } from 'react'
import ToolTip from 'react-tooltip'
import {
  getUsersToExplore,
  getPhotosToExplore,
  getGroupsToExplore,
} from '../../actions/explore'
import { connect } from 'react-redux'
import FAIcon from '../others/icons/font-awesome-icon'
import { string } from 'prop-types'

const RefreshExplores = ({ url, dispatch }) => {
  let refresh = e => {
    e.preventDefault()

    dispatch(
      url == '/explore'
        ? getUsersToExplore()
        : url == '/explore/explore-photos'
          ? getPhotosToExplore()
          : url == '/explore/explore-groups'
            ? getGroupsToExplore()
            : null
    )
  }

  return (
    <Fragment>
      <a href="#" className="exp_refresh" data-tip="Refresh" onClick={refresh}>
        <FAIcon icon="sync-alt" />
      </a>
      <ToolTip />
    </Fragment>
  )
}

RefreshExplores.propTypes = {
  url: string.isRequired,
}

export default connect()(RefreshExplores)
