import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import ToolTip from 'react-tooltip'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import Emojis from '../../others/emojis'
import { post } from 'axios'
import { geolocation, geolocationError } from '../../../utils/utils'
import { addPost } from '../../../utils/post-utils'
import { GOOGLE_GEOLOCATION_KEY } from '../../../../../../env'
import SearchFollowings from '../../others/search-followings'
import Overlay from '../../others/overlay'
import { connect } from 'react-redux'

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

  // select filter
  SF = filter => {
    this.setState({ filter })
    $('.filter_div').removeClass('select_receiver_toggle')
    $(`.fp_${filter}`).addClass('select_receiver_toggle')
  }

  getLocation = () => {
    let geolocationSuccess = async pos => {
      let
        { latitude, longitude } = pos.coords,
        { data: { results } } = await post(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOLOCATION_KEY}`
        ),
        loc = results[0].formatted_address
      this.setState({ location: loc })
    }

    geolocation(geolocationSuccess, geolocationError)
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
      { fileInput, fileChanged, previewImg, desc, filter, showEmojis, location, addTag, tags, showOverlay } = this.state,
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
                <Scrollbars style={{ height: 396 }} className='add_filters'>
                  <div className='add_filters_main'>
                    <div className='filter_div fp_normal' onClick={() => this.SF('normal')} >
                      <img className='normal' src={previewImg} />
                      <span>Normal</span>
                    </div>
                    <div className='filter_div fp_filter-1977' onClick={() => this.SF('filter-1977')} >
                      <img className='filter-1977' src={previewImg} />
                      <span>1977</span>
                    </div>
                    <div className='filter_div fp_filter-aden' onClick={() => this.SF('filter-aden')} >
                      <img className='filter-aden' src={previewImg} />
                      <span>Aden</span>
                    </div>
                    <div className='filter_div fp_filter-amaro' onClick={() => this.SF('filter-amaro')} >
                      <img className='filter-amaro' src={previewImg} />
                      <span>Amaro</span>
                    </div>
                    <div className='filter_div fp_filter-ashby' onClick={() => this.SF('filter-ashby')} >
                      <img className='filter-ashby' src={previewImg} />
                      <span>Ashby</span>
                    </div>
                    <div className='filter_div fp_filter-brannan' onClick={() => this.SF('filter-brannan')} >
                      <img className='filter-brannan' src={previewImg} />
                      <span>Brannan</span>
                    </div>
                    <div className='filter_div fp_filter-brooklyn' onClick={() => this.SF('filter-brooklyn')} >
                      <img className='filter-brooklyn' src={previewImg} />
                      <span>Brooklyn</span>
                    </div>
                    <div className='filter_div fp_filter-charmes' onClick={() => this.SF('filter-charmes')} >
                      <img className='filter-charmes' src={previewImg} />
                      <span>Charmes</span>
                    </div>
                    <div className='filter_div fp_filter-clarendon' onClick={() => this.SF('filter-clarendon')} >
                      <img className='filter-clarendon' src={previewImg} />
                      <span>Clarendon</span>
                    </div>
                    <div className='filter_div fp_filter-crema' onClick={() => this.SF('filter-crema')} >
                      <img className='filter-crema' src={previewImg} />
                      <span>Crema</span>
                    </div>
                    <div className='filter_div fp_filter-dogpatch' onClick={() => this.SF('filter-dogpatch')} >
                      <img className='filter-dogpatch' src={previewImg} />
                      <span>Dogpatch</span>
                    </div>
                    <div className='filter_div fp_filter-earlybird' onClick={() => this.SF('filter-earlybird')} >
                      <img className='filter-earlybird' src={previewImg} />
                      <span>Earlybird</span>
                    </div>
                    <div className='filter_div fp_filter-gingham' onClick={() => this.SF('filter-gingham')} >
                      <img className='filter-gingham' src={previewImg} />
                      <span>Gingham</span>
                    </div>
                    <div className='filter_div fp_filter-ginza' onClick={() => this.SF('filter-ginza')} >
                      <img className='filter-ginza' src={previewImg} />
                      <span>Ginza</span>
                    </div>
                    <div className='filter_div fp_filter-hefe' onClick={() => this.SF('filter-hefe')} >
                      <img className='filter-hefe' src={previewImg} />
                      <span>Hefe</span>
                    </div>
                    <div className='filter_div fp_filter-helena' onClick={() => this.SF('filter-helena')} >
                      <img className='filter-helena' src={previewImg} />
                      <span>Helena</span>
                    </div>
                    <div className='filter_div fp_filter-hudson' onClick={() => this.SF('filter-hudson')} >
                      <img className='filter-hudson' src={previewImg} />
                      <span>Hudson</span>
                    </div>
                    <div className='filter_div fp_filter-inkwell' onClick={() => this.SF('filter-inkwell')} >
                      <img className='filter-inkwell' src={previewImg} />
                      <span>Inkwell</span>
                    </div>
                    <div className='filter_div fp_filter-juno' onClick={() => this.SF('filter-juno')} >
                      <img className='filter-juno' src={previewImg} />
                      <span>Juno</span>
                    </div>
                    <div className='filter_div fp_filter-kelvin' onClick={() => this.SF('filter-kelvin')} >
                      <img className='filter-kelvin' src={previewImg} />
                      <span>Kelvin</span>
                    </div>
                    <div className='filter_div fp_filter-lark' onClick={() => this.SF('filter-lark')} >
                      <img className='filter-lark' src={previewImg} />
                      <span>Lark</span>
                    </div>
                    <div className='filter_div fp_filter-lofi' onClick={() => this.SF('filter-lofi')} >
                      <img className='filter-lofi' src={previewImg} />
                      <span>Lofi</span>
                    </div>
                    <div className='filter_div fp_filter-ludwig' onClick={() => this.SF('filter-ludwig')} >
                      <img className='filter-ludwig' src={previewImg} />
                      <span>Ludwig</span>
                    </div>
                    <div className='filter_div fp_filter-maven' onClick={() => this.SF('filter-maven')} >
                      <img className='filter-maven' src={previewImg} />
                      <span>Maven</span>
                    </div>
                    <div className='filter_div fp_filter-mayfair' onClick={() => this.SF('filter-mayfair')} >
                      <img className='filter-mayfair' src={previewImg} />
                      <span>Mayfair</span>
                    </div>
                    <div className='filter_div fp_filter-moon' onClick={() => this.SF('filter-moon')} >
                      <img className='filter-moon' src={previewImg} />
                      <span>Moon</span>
                    </div>
                    <div className='filter_div fp_filter-nashville' onClick={() => this.SF('filter-nashville')} >
                      <img className='filter-nashville' src={previewImg} />
                      <span>Nashville</span>
                    </div>
                    <div className='filter_div fp_filter-perpetua' onClick={() => this.SF('filter-perpetua')} >
                      <img className='filter-perpetua' src={previewImg} />
                      <span>Perpetua</span>
                    </div>
                    <div className='filter_div fp_filter-poprocket' onClick={() => this.SF('filter-poprocket')} >
                      <img className='filter-poprocket' src={previewImg} />
                      <span>Poprocket</span>
                    </div>
                    <div className='filter_div fp_filter-reyes' onClick={() => this.SF('filter-reyes')} >
                      <img className='filter-reyes' src={previewImg} />
                      <span>Reyes</span>
                    </div>
                    <div className='filter_div fp_filter-rise' onClick={() => this.SF('filter-rise')} >
                      <img className='filter-rise' src={previewImg} />
                      <span>Rise</span>
                    </div>
                    <div className='filter_div fp_filter-sierra' onClick={() => this.SF('filter-sierra')} >
                      <img className='filter-sierra' src={previewImg} />
                      <span>Sierra</span>
                    </div>
                    <div className='filter_div fp_filter-skyline' onClick={() => this.SF('filter-skyline')} >
                      <img className='filter-skyline' src={previewImg} />
                      <span>Skyline</span>
                    </div>
                    <div className='filter_div fp_filter-slumber' onClick={() => this.SF('filter-slumber')} >
                      <img className='filter-slumber' src={previewImg} />
                      <span>Slumber</span>
                    </div>
                    <div className='filter_div fp_filter-stinson' onClick={() => this.SF('filter-stinson')} >
                      <img className='filter-stinson' src={previewImg} />
                      <span>Stinson</span>
                    </div>
                    <div className='filter_div fp_filter-sutro' onClick={() => this.SF('filter-sutro')} >
                      <img className='filter-sutro' src={previewImg} />
                      <span>Sutro</span>
                    </div>
                    <div className='filter_div fp_filter-toaster' onClick={() => this.SF('filter-toaster')} >
                      <img className='filter-toaster' src={previewImg} />
                      <span>Toaster</span>
                    </div>
                    <div className='filter_div fp_filter-valencia' onClick={() => this.SF('filter-valencia')} >
                      <img className='filter-valencia' src={previewImg} />
                      <span>Valencia</span>
                    </div>
                    <div className='filter_div fp_filter-vesper' onClick={() => this.SF('filter-vesper')} >
                      <img className='filter-vesper' src={previewImg} />
                      <span>Vesper</span>
                    </div>
                    <div className='filter_div fp_filter-walden' onClick={() => this.SF('filter-walden')} >
                      <img className='filter-walden' src={previewImg} />
                      <span>Walden</span>
                    </div>
                    <div className='filter_div fp_filter-willow' onClick={() => this.SF('filter-willow')} >
                      <img className='filter-willow' src={previewImg} />
                      <span>Willow</span>
                    </div>
                    <div className='filter_div fp_filter-xpro-ii' onClick={() => this.SF('filter-xpro-ii')} >
                      <img className='filter-xpro-ii' src={previewImg} />
                      <span>Xpro-ii</span>
                    </div>
                  </div>
                </Scrollbars>
                : null
            }

            <div className='i_p_top p_top'>
              <div className='i_p_info p_info'>
                <img src={`/users/${id}/avatar.jpg`} />
                <span>{username}</span>
              </div>
              <span className='loc_text' title={location} >
                { location ? `${location.substr(0, 20)}..` : '' }
              </span>
            </div>

            <div className='i_p_main p_main' style={{ height: 296 }} >
              {
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
