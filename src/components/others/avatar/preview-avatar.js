import React from 'react'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'
import ModalHeader from '../modal/modal-header'
import PrimaryButton from '../button/primary-btn'
import SecondaryButton from '../button/secondary-btn'

const PreviewAvatar = ({ previewAvatar, back, upload }) => {
  return (
    <div className='preview_avatar modal' >
      <FadeIn duration='300ms' >
        <ModalHeader title='Change Avatar' />
        <div className='c_a_middle' >
          <img src={previewAvatar} />
        </div>
        <div className='c_a_bottom modal_bottom'>
          <SecondaryButton
            label='Cancel'
            onClick={back}
          />
          <PrimaryButton
            label='Change avatar'
            onClick={upload}
            extraClass='c_a_add'
          />
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
