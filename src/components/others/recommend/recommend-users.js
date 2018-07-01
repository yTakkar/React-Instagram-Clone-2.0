import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getUsersToRecommend } from '../../../actions/follow'
import RecommendUsersList from './ru-list'
import { llr } from '../../../utils/utils'
import PropTypes from 'prop-types'
import ModalHeader from '../modal/modal-header'
import ModalBack from '../modal/modal-back'
import ModalMiddle from '../modal/modal-middle'
import IsLoading from '../isLoading'
import Overlay from '../overlay'

@connect(store => ({
  users: store.Follow.usersToRecommend,
  ud: store.User.user_details,
}))
export default class RecommendUsers extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, ud } = this.props
    dispatch(getUsersToRecommend(ud.id))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state,
      { users, back } = this.props,
      map_users = users.map(u => (
        <RecommendUsersList key={u.follow_id} {...u} back={back} />
      ))

    return (
      <Fragment>
        <Overlay />

        <div className="likes modal modal_big">
          <FadeIn duration="300ms">
            <ModalHeader title="Recommend" />

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

RecommendUsers.propTypes = {
  back: PropTypes.func.isRequired,
}
