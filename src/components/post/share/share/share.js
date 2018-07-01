import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../../others/title'
import ShareList from './share-list'
import { getUsersToShare } from '../../../../actions/post'
import { connect } from 'react-redux'
import { llr } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import ModalMiddle from '../../../others/modal/modal-middle'
import IsLoading from '../../../others/isLoading'
import Overlay from '../../../others/overlay'

class Share extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { post, dispatch } = this.props
    dispatch(getUsersToShare(post))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state
    let {
      users,
      post,
      incrementShares,
      decrementShares,
      postOwner,
      back,
    } = this.props

    let map_users = users.map(u => (
      <ShareList
        key={u.follow_id}
        {...u}
        post={post}
        incrementShares={incrementShares}
        decrementShares={decrementShares}
        postOwner={postOwner}
      />
    ))

    return (
      <Fragment>
        <Overlay />

        <div className="modal modal_big">
          <Title value="Share post" />

          <FadeIn duration="300ms">
            <ModalHeader title="Share post to" />

            <Scrollbars style={{ height: 450 }} className="modal_middle">
              <IsLoading loading={loading} />
              <ModalMiddle loading={loading} list={map_users} />
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

Share.propTypes = {
  post: PropTypes.number.isRequired,
  postOwner: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  incrementShares: PropTypes.func.isRequired,
  decrementShares: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  users: store.Post.usersToShare,
})

export default connect(mapStateToProps)(Share)
export { Share as PureShare }
