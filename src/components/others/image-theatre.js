import React from 'react'
import { FadeIn } from 'animate-components'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import TimeAgo from 'handy-timeago'
import PropTypes from 'prop-types'
import MaterialIcon from './icons/material-icon'

const ImageTheatre = props => {
  let {
    showInfo, imgSrc, filter, username, time, link
  } = props

  return (
    <div className='image_show'>
      <FadeIn duration='300ms'>

        <div className='img_s_img'>
          <img src={imgSrc} className={filter} />

          {
            showInfo ?
              <div className='img_s_bottom'>
                <span className='img_s_by'>
                  by {username} ({ TimeAgo(time).replace(' ago', '') })
                </span>
                <Link
                  to={link}
                  className='img_s_window'
                  data-tip='Open separately'
                >
                  <MaterialIcon icon='open_in_new' />
                </Link>
              </div>
              : null
          }

        </div>

      </FadeIn>

      <ToolTip/>
    </div>
  )
}

ImageTheatre.defaultProps = {
  showInfo: true,
  imgSrc: '/images/location.jpg',
  filter: ''
}

ImageTheatre.propTypes = {
  showInfo: PropTypes.bool,
  imgSrc: PropTypes.string.isRequired,
  filter: PropTypes.string,
  username: PropTypes.string,
  link: PropTypes.string,
  time: PropTypes.string
}

export default ImageTheatre
