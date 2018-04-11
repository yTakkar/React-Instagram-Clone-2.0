import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { Scrollbars } from 'react-custom-scrollbars'
import Spinner from '../../others/spinner'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'
import { getOnlineUsers } from '../../../store/actions/message-a'
import { llr } from '../../../utils/utils'
import OnlineUser from './onlineUser'
import PropTypes from 'prop-types'

@connect(store => (
  { onlineUsers: store.Message.onlineUsers }
))

export default class OnlineUsers extends Component {

  state = {
    loading: true
  }

  componentDidMount = () =>
    this.props.dispatch(getOnlineUsers())

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
      { back, onlineUsers } = this.props,
      len = onlineUsers.length,
      map_users = onlineUsers.map(user =>
        <OnlineUser
          key={user.user}
          {...user}
          back={back}
        />
      )

    return (
      <div class='modal modal_big' >

        <Title value='Online members' />

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Online members</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div
              className={`modal_main ${loading ? 'cLoading' : ''}`}>
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

OnlineUsers.propTypes = {
  back: PropTypes.func.isRequired
}
