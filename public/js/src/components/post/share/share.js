import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../others/title'
import Spinner from '../../others/spinner'
import Nothing from '../../others/nothing'
import ShareList from './share-list'
import { getUsersToShare } from '../../../store/actions/post-a'
import { connect } from 'react-redux'
import { llr } from '../../../utils/utils'

@connect(store => (
  { users: store.Post.usersToShare }
))

export default class Share extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { post, dispatch } = this.props
    dispatch(getUsersToShare(post))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  render() {
    let
      { loading } = this.state,
      { users, post, incrementShares, decrementShares, postOwner } = this.props,
      len = users.length,
      map_users = users.map(u =>
        <ShareList
          key={u.follow_id}
          {...u}
          post={post}
          incrementShares={incrementShares}
          decrementShares={decrementShares}
          postOwner={postOwner}
        />
      )

    return (
      <div class='modal modal_big' >

        <Title value='Share post' />

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Share post to</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div
              className={`modal_main ${len != 0 ? 'select_receiver_main' : ''} ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_users }
            </div>

          </Scrollbars>

          <div className='modal_bottom'>
            <a href='#' className='pri_btn' onClick={this.back} >Back</a>
          </div>
        </FadeIn>

      </div>
    )
  }
}
