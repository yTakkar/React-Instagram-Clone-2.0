import React, { Fragment } from 'react'
import TimeAgo from 'handy-timeago'
import AppLink from '../link/link'
import { string, bool } from 'prop-types'
import MaterialIcon from '../icons/material-icon'

const ImageTheatreInfo = props => {
  let { showInfo, username, time, link } = props

  let ago = TimeAgo(time) ? TimeAgo(time).replace(' ago', '') : null

  let imgBy = `by ${username} (${ago})`

  return (
    <Fragment>
      {showInfo ? (
        <div className="img_s_bottom">
          <span className="img_s_by">{imgBy}</span>
          <AppLink
            url={link}
            className="img_s_window"
            data-tip="Open separately"
          >
            <MaterialIcon icon="open_in_new" />
          </AppLink>
        </div>
      ) : null}
    </Fragment>
  )
}

ImageTheatreInfo.propTypes = {
  showInfo: bool,
  username: string,
  link: string,
  time: string,
}

export default ImageTheatreInfo
