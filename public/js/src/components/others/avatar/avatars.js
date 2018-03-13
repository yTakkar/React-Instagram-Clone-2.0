import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { post } from 'axios'
import $ from 'jquery'
import Spinner from '../spinner'
import Notify from 'handy-notification'
import Overlay from '../overlay'
import PreviewAvatar from './preview-avatar'
import { upload_avatar } from '../../../utils/edit-profile-utils'

export default class Avatars extends React.Component {

  state = {
    loading: true,
    avatars: [],
    selectedAvatar: '',
    fileAvatarChanged: false,       // to toggle previewAvatar component
    fileInput: '',                  // file input value
    previewAvatar: '/images/spacecraft.jpg', // preview Image for previewAvatar component
    targetFile: ''   // file when input[type='file'] has changed. eg. files[0]
  }

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  componentDidMount = async () => {
    let { data: avatars } = await post('/api/get-avatars')
    this.setState({ avatars, loading: false })
  }

  selectAvatar = e => {
    let avatar = $(`[data-avatar="avatar-${e}"]`)
    avatar.siblings().removeClass('pro_ava_active')
    avatar.addClass('pro_ava_active')
    $('.btn_select_avatar').focus()
    this.setState({ selectedAvatar: e })
  }

  changeAvatar = async e => {
    e.preventDefault()
    let
      { selectedAvatar: avatar } = this.state,
      { of, group } = this.props,
      { data: { mssg } } = await post('/api/change-avatar', { avatar, of, group })
    Notify({ value: mssg, done: () => location.reload() })
  }

  previewAvatar = e => {
    this.setState({ fileAvatarChanged: true })
    this.setState({ fileInput: e.target.value })
    let
      reader = new FileReader(),
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
    let {
      state: { targetFile },
      props: { of, group }
    } = this
    upload_avatar({
      file: targetFile,
      of,
      group
    })
  }

  render() {
    let
      { avatars, loading, fileAvatarChanged, fileInput, previewAvatar } = this.state,
      map_avatars = avatars.map(a =>
        <img
          key={a}
          src={`/images/avatars/${a}`}
          data-avatar={`avatar-${a}`}
          className='pro_ava_avts'
          onClick={() => this.selectAvatar(a)}
        />
      )

    return (
      <div className='pro_avatars'>
        <div className='pro_ava_top'>
          <div className='pro_ava_info'>
            <span>Change your avatar</span>
          </div>
          <span className='pro_ava_close' onClick={this.back} >
            <i className='material-icons'>close</i>
          </span>
        </div>
        <Scrollbars style={{ height: '300px' }} className='pro_ava_middle'>
          <div className='pro_ava_content'>
            { loading ? <Spinner/> : map_avatars }
          </div>
        </Scrollbars>
        <div className='pro_ava_bottom'>
          <form className='pro_ch_form' method='post' encType='multipart/formdata'>
            <input
              type='file'
              name='pro_ch_ava'
              id='pro_ch_ava'
              accept='image/*'
              value={fileInput}
              onChange={this.previewAvatar}
            />
            <label for='pro_ch_ava' className='sec_btn'>Upload avatar</label>
          </form>
          <div className='pro_ava_bottom_act'>
            <a href='#' className='sec_btn' onClick={this.back} >Cancel</a>
            <a href='#' className={`pri_btn btn_select_avatar ${loading ? 'a_disabled' : ''}`} onClick={this.changeAvatar} >Apply</a>
          </div>
        </div>

        {
          fileAvatarChanged ?
            <div>
              <Overlay/>
              <PreviewAvatar
                previewAvatar={previewAvatar}
                back={this.previewAvatarBack}
                upload={this.uploadAvatar}
              />
            </div>
            : null
        }

      </div>
    )
  }
}
