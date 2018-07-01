import React, { Component, Fragment } from 'react'
import { upload_avatar } from '../../../utils/avatar-utils'
import PropTypes from 'prop-types'
import PreviewAvatar from './preview-avatar'
import FileInput from '../input/file'

export default class UploadAvatar extends Component {
  state = {
    fileAvatarChanged: false, // to toggle previewAvatar component
    fileInput: '', // file input value
    previewAvatar: '/images/spacecraft.jpg', // preview Image for previewAvatar component
    targetFile: '', // file when input[type='file'] has changed. eg. files[0]
  }

  previewAvatar = e => {
    this.setState({ fileAvatarChanged: true })
    this.setState({ fileInput: e.target.value })
    let reader = new FileReader(),
      file = e.target.files[0]
    this.setState({ targetFile: file })
    reader.onload = e => this.setState({ previewAvatar: e.target.result })
    reader.readAsDataURL(file)
  }

  previewAvatarBack = e => {
    e.preventDefault()
    this.setState({ fileAvatarChanged: false })
    this.setState({ fileInput: '' })
  }

  uploadAvatar = e => {
    e.preventDefault()
    let { targetFile } = this.state
    let { of, group } = this.props
    upload_avatar({
      file: targetFile,
      of,
      group,
    })
  }

  render() {
    let { fileInput, fileAvatarChanged, previewAvatar } = this.state

    return (
      <Fragment>
        <form
          className="pro_ch_form"
          method="post"
          encType="multipart/formdata"
        >
          <FileInput
            value={fileInput}
            fileChange={this.previewAvatar}
            label="Upload avatar"
            labelClass="sec_btn"
          />
        </form>

        {fileAvatarChanged ? (
          <PreviewAvatar
            previewAvatar={previewAvatar}
            back={this.previewAvatarBack}
            upload={this.uploadAvatar}
          />
        ) : null}
      </Fragment>
    )
  }
}

UploadAvatar.propTypes = {
  of: PropTypes.oneOf(['user', 'group']).isRequired,
  group: PropTypes.number,
}
