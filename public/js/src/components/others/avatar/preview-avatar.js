/* eslint no-unused-vars:0 */

import React from 'react'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'

const PreviewAvatar = ({ previewAvatar, back, upload }) => {
  return (
    <div className='preview_avatar modal' >
      <FadeIn duration='300ms' >
        <div className='c_a_header modal_header'>
          <span className='title' >Change Avatar</span>
        </div>
        <div className='c_a_middle' >
          <img src={previewAvatar} />
        </div>
        <div className='c_a_bottom modal_bottom'>
          <a href='#' className='c_a_cancel sec_btn' onClick={back} >Cancel</a>
          <a href='#' className='c_a_add pri_btn' onClick={upload} >Change avatar</a>
        </div>
      </FadeIn>
    </div>
  )
}

PreviewAvatar.propTypes = {
  previewAvatar: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired
}

export default PreviewAvatar
