import React from 'react'
import ToolTip from 'react-tooltip'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import Emojis from '../../others/emojis'
import { geolocation, getAddress } from '../../../utils/utils'
import { addPost } from '../../../utils/post-utils'
import SearchFollowings from '../../others/search-followings'
import Overlay from '../../others/overlay'
import { connect } from 'react-redux'
import Filters from './filters'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class PostIt extends React.Component {

  state = {
    fileInput: '',                        // file input value
    fileChanged: false,                   // for checking file has changed
    targetFile: '',                       // file
    previewImg: '/images/location.jpg',  // image which will be previewd
    desc: '',                            // textarea value
    filter: 'normal',
    showEmojis: false,
    fetchingLocation: false,
    location: '',
    addTag: false,
    tags: [],
    showOverlay: false
  }

  _toggle = what => {
    this.setState({
      [what]: !this.state[what]
    })
  }

  fileChanged = e => {
    e.preventDefault()
    this.setState({ fileChanged: true })
    this.setState({ fileInput: e.target.value })
    let
      reader = new FileReader(),
      file = e.target.files[0]
    this.setState({ targetFile: file })
    reader.onload = e => this.setState({ previewImg: e.target.result })
    reader.readAsDataURL(file)
  }

  selectFilter = filter => {
    this.setState({ filter })
    $('.filter_div').removeClass('select_receiver_toggle')
    $(`.fp_${filter}`).addClass('select_receiver_toggle')
  }

  getLocation = () => {
    this.setState({ fetchingLocation: true })
    let geolocationSuccess = async pos => {
      let address = await getAddress(pos)
      this.setState({
        fetchingLocation: false,
        location: address
      })
    }
    geolocation(geolocationSuccess)
  }

  deleteTag = tag  => {
    let remainder = this.state.tags.filter(t => t.username != tag)
    this.setState({ tags: remainder })
  }

  addPost = async e => {
    e.preventDefault()
    $('.p_post')
      .addClass('a_disabled')
      .text('Wait..')

    this.setState({ showOverlay: true })
    let
      { desc, targetFile, filter, location, tags } = this.state,
      { dispatch, back, type, group, gd: { name } } = this.props

    await addPost({ dispatch, desc, targetFile, filter, location, tags, type, group, group_name: name })
    back()
  }

  render() {
    let
      id = $('.data').data('session'),
      username = $('.data').data('username'),
      { back } = this.props,
      { fileInput, fileChanged, previewImg, desc, filter, showEmojis, location, addTag, tags, showOverlay, fetchingLocation } = this.state,
      map_tags = tags.map(t =>
        <span
          key={t.username}
          className='p_taggings'
          onClick={() => this.deleteTag(t.username)}
        >{t.username}</span>
      )

    return (
      <div>

        <div className='post' style={{ left: fileChanged ? '41%' : '50%' }} >
          <FadeIn duration='300ms'>

            {
              fileChanged ?
                <Filters
                  previewImg={previewImg}
                  selectFilter={this.selectFilter}
                />
                : null
            }

            <div className='i_p_top p_top'>
              <div className='i_p_info p_info'>
                <img src={`/users/${id}/avatar.jpg`} />
                <span>{username}</span>
              </div>
              <span className='loc_text' title={location} >
                {
                  fileChanged && fetchingLocation
                    ? 'Fetching location...'
                    : location
                      ? `${location.substr(0, 20)}..`
                      : ''
                }
              </span>
            </div>

            <div className='i_p_main p_main' style={{ height: 296 }} >
              {
                // Show if image/file is selected
                fileChanged ?
                  <div>
                    <div className='i_p_ta'>
                      <textarea
                        name='name'
                        placeholder={`What's new with you, @${username}?`}
                        spellCheck='false'
                        className='t_p_ta'
                        value={desc}
                        onChange={e => this.setState({ desc: e.target.value })}
                      ></textarea>
                    </div>
                    <div className='i_p_img'>
                      <img src={previewImg} className={filter} />
                    </div>
                  </div>
                  :
                  // If not show button to select
                  <form className='post_img_form' method='post' encType='multipart/formdata'>
                    <input
                      type='file'
                      id='post_img'
                      accept='image/*'
                      value={fileInput}
                      onChange={this.fileChanged}
                    />
                    <label for='post_img' className='pri_btn'>Choose an image</label>
                  </form>
              }

            </div>

            <div className='p_tagging'>
              { map_tags }
            </div>

            {
              addTag ?
                <SearchFollowings
                  when='tag'
                  placeholder='Search to tag'
                  done={data =>
                    this.setState({ tags: data })
                  }
                />
                : null
            }

            <div className='t_p_bottom p_bottom'>
              <div className='t_p_tag p_tag' style={{ visibility: !fileChanged ? 'hidden' : 'visible' }} >
                <div>
                  <span
                    className={`emoji_add ${showEmojis ? 'p_span_toggle' : ''}`}
                    data-tip='Add emojis'
                    onClick={() => this._toggle('showEmojis') }
                  ><i className='material-icons'>sentiment_very_satisfied</i></span>
                  <span
                    className={`tag_add ${addTag ? 'p_span_toggle' : ''}`}
                    data-tip='Tag people'
                    onClick={() => this._toggle('addTag') }
                  ><i className='material-icons'>loyalty</i></span>
                  <span
                    className={`loc_add ${location ? 'p_span_toggle' : ''}`}
                    data-tip='Add location'
                    onClick={this.getLocation}
                  ><i className='material-icons'>location_on</i></span>
                </div>
              </div>

              <div className='t_p_act p_act'>
                <a href='#' className='sec_btn p_cancel' onClick={back} >Cancel</a>
                <a href='#' className={`pri_btn p_post ${!fileChanged ? 'a_disabled' : ''}`} onClick={this.addPost} >Post</a>
              </div>
            </div>
          </FadeIn>
        </div>

        <ToolTip/>

        { showOverlay ? <Overlay type='white' /> : null }

        {
          showEmojis ?
            <Emojis
              position={{ top: 227, left: 144 }}
              textArea={$('.t_p_ta')}
              setState={value => {
                this.setState({ desc: value })
              }}
            />
            : null
        }

      </div>
    )
  }
}
