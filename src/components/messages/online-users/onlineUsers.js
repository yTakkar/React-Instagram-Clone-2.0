import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getOnlineUsers } from '../../../actions/message'
import { llr } from '../../../utils/utils'
import OnlineUser from './onlineUser'
import PropTypes from 'prop-types'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'
import Overlay from '../../others/overlay'

class OnlineUsers extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => this.props.dispatch(getOnlineUsers())

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state,
      { back, onlineUsers } = this.props,
      map_users = onlineUsers.map(user => (
        <OnlineUser key={user.user} {...user} back={back} />
      ))

    return (
      <Fragment>
        <Overlay />

        <div className="modal modal_big">
          <Title value="Online members" />

          <FadeIn duration="300ms">
            <ModalHeader title="Online members" />

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

OnlineUsers.propTypes = {
  back: PropTypes.func.isRequired,
}

const mapsStateToProps = store => ({
  onlineUsers: store.Message.onlineUsers,
})

export default connect(mapsStateToProps)(OnlineUsers)
export { OnlineUsers as PureOnlineUsers }
