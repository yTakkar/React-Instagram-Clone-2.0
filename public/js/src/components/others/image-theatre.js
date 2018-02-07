import React from 'react'
import { FadeIn } from 'animate-components'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import TimeAgo from 'handy-timeago'

export default class ImageTheatre extends React.Component {
  render() {
    let { showInfo, imgSrc, filter, username, time, link } = this.props

    return (
      <div className='image_show'>
        <FadeIn duration='300ms'>

          <div className='img_s_img'>
            <img src={imgSrc} className={filter} />

            {
              showInfo ?
                <div className='img_s_bottom'>
                  <span className='img_s_by'>by {username} ({ TimeAgo(time).replace(' ago', '') })</span>
                  <Link to={link} className='img_s_window' data-tip='Open separately'>
                    <i className='material-icons'>open_in_new</i>
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
}

ImageTheatre.defaultProps = {
  imgSrc: '/images/location.jpg',
  showInfo: true
}
