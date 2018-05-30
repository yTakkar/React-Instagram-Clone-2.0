import React, { Fragment } from 'react'
import ToolTip from 'react-tooltip'
import {
  getUsersToExplore, getPhotosToExplore, getGroupsToExplore
} from '../../actions/explore'
import { connect } from 'react-redux'
import FAIcon from '../others/icons/font-awesome-icon'

const RefreshExplores = ({ dispatch }) => {

  let refresh = e => {
    e.preventDefault()
    let path = location.pathname

    dispatch(
      path == '/explore'
        ? getUsersToExplore()
        : path == '/explore/explore-photos'
          ? getPhotosToExplore()
          : path == '/explore/explore-groups'
            ? getGroupsToExplore()
            : null
    )
  }

  return (
    <Fragment>
      <a
        href='#'
        className='exp_refresh'
        data-tip='Refresh'
        onClick={refresh}
      >
        <FAIcon icon='sync-alt' />
      </a>
      <ToolTip/>
    </Fragment>
  )
}

export default connect()(RefreshExplores)
