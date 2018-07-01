import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../../others/title'
import { getPostLikes } from '../../../../actions/post'
import { connect } from 'react-redux'
import LikeList from './like-list/like-list'
import { llr } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import ModalMiddle from '../../../others/modal/modal-middle'
import IsLoading from '../../../others/isLoading'
import Overlay from '../../../others/overlay'

class Likes extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { post, dispatch } = this.props
    dispatch(getPostLikes(post))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state,
      { likes, decrementLikes, back } = this.props,
      map_likes = likes.map(l => (
        <LikeList key={l.like_id} {...l} decrementLikes={decrementLikes} />
      ))

    return (
      <Fragment>
        <Overlay />

        <div className="likes modal modal_big">
          <Title value="Likes" />

          <FadeIn duration="300ms">
            <ModalHeader title="Likes" />

            <Scrollbars style={{ height: 450 }} className="modal_middle">
              <IsLoading loading={loading} />
              <ModalMiddle loading={loading} list={map_likes} />
            </Scrollbars>

            <div className="modal_bottom">
              <ModalBack back={back} />
            </div>
          </FadeIn>
        </div>
      </Fragment>
    )
  }
}

Likes.propTypes = {
  post: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  decrementLikes: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  likes: store.Post.likes,
})

export default connect(mapStateToProps)(Likes)
export { Likes as PureLikes }
