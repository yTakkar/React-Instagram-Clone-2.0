import React from 'react'
import { Link } from 'react-router-dom'
import { post } from 'axios'
import Notify from 'handy-notification'
import { insta_notify, Me } from '../../../utils/utils'
import $ from 'jquery'

export default class ShareList extends React.Component {

  state = {
    didIShare: false
  }

  componentDidMount = () =>
    this.setState({ didIShare: this.props.didIShare })

  componentWillReceiveProps = ({ didIShare }) =>
    this.props.didIShare != didIShare ? this.setState({ didIShare }) : null

  share = async e => {
    e.preventDefault()
    $('.share_btn').blur()

    let
      { follow_to, post: post_id, incrementShares, postOwner } = this.props,
      { data: { mssg, success } } = await post('/api/share-post', { share_to: follow_to, post: post_id })

    if (success) {
      insta_notify({ to: follow_to, type: 'share', post_id })
      !Me(postOwner) ? insta_notify({ to: postOwner, type: 'shared_your_post', post_id }) : null
      incrementShares()
    }

    this.setState({ didIShare: true })
    Notify({ value: mssg })
  }

  unshare = async e => {
    e.preventDefault()
    $('.share_btn').blur()

    let { follow_to, username, post: post_id, decrementShares } = this.props
    await post('/api/unshare-post', { unshare_to: follow_to, post: post_id })
    this.setState({ didIShare: false })
    decrementShares()
    Notify({ value: `Unshared to ${username}` })
  }

  render() {
    let
      { follow_to, username, firstname, surname } = this.props,
      { didIShare } = this.state

    return (
      <div className='modal_items'>
        <div className='modal_it_img'>
          <img src={`/users/${follow_to}/avatar.jpg`} />
        </div>
        <div className='modal_it_content '>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
            <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
          </div>
          <div className='modal_ff'>
            {
              didIShare ?
                <a href='#' className='share_btn sec_btn' onClick={this.unshare} >Unshare</a>
                : <a href='#' className='share_btn pri_btn' onClick={this.share} >Share</a>
            }
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}
