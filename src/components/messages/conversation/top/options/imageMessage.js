import React, { Fragment } from 'react'
import { imageMessage } from '../../../../../utils/message-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FileInput from '../../../../others/input/file'

const ImageMessage = ({ cd, toggleOptions, dispatch }) => {
  let { con_id, con_with } = cd

  let message = async e => {
    e.preventDefault()
    toggleOptions()
    imageMessage({
      con_id,
      con_with,
      file: e.target.files[0],
      dispatch,
    })
  }

  return (
    <Fragment>
      <li>
        <form className="mssg_add_img_form">
          <FileInput
            value=""
            fileChange={message}
            label="Send image"
            labelClass="mssg_img"
          />
        </form>
      </li>
    </Fragment>
  )
}

ImageMessage.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cd: state.Message.conDetails,
})

export default connect(mapStateToProps)(ImageMessage)
export { ImageMessage as PureImageMessage }
