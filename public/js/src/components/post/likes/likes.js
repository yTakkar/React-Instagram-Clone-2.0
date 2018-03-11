import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Nothing from '../../others/nothing'
import Title from '../../others/title'
import { getPostLikes } from '../../../store/actions/post-a'
import { connect } from 'react-redux'
import Spinner from '../../others/spinner'
import LikeList from './like-list'
import { llr } from '../../../utils/utils'

@connect(store => (
  { likes: store.Post.likes }
))

export default class Likes extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { post, dispatch } = this.props
    dispatch(getPostLikes(post))
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
      { likes, decrementLikes } = this.props,
      len = likes.length,
      map_likes = likes.map(l =>
        <LikeList
          key={l.like_id}
          {...l}
          decrementLikes={decrementLikes}
        />
      )

    return (
      <div class='likes modal modal_big' >

        <Title value='Likes' />

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Likes</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_likes }
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
