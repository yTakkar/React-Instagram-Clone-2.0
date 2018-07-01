import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getConAbout } from '../../../../actions/message'
import ConversationMedia from './media'
import ConversationWith from './con-with'
import PropTypes from 'prop-types'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import IsLoading from '../../../others/isLoading'
import ConSince from './con-since'
import MessagesCount from './mssgs-count'
import { cLoading } from '../../../../utils/utils'
import Overlay from '../../../others/overlay'
import classNames from 'classnames'

class AboutConversation extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      cd: { con_id, con_with },
    } = this.props
    dispatch(getConAbout(con_id, con_with))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { loading } = this.state
    let { back } = this.props

    return (
      <Fragment>
        <Overlay />

        <div className="modal modal_big">
          <FadeIn duration="300ms">
            <ModalHeader title="About conversation" />

            <Scrollbars style={{ height: 450 }} className="modal_middle">
              <IsLoading loading={loading} />

              <div
                className={classNames('modal_main', cLoading(loading))}
                style={{ padding: 0 }}
              >
                <div className="about_con">
                  <ConversationWith />
                  <ConSince />
                  <MessagesCount />
                  <ConversationMedia />
                </div>
              </div>
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

AboutConversation.propTypes = {
  back: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  store,
  cd: store.Message.conDetails,
})

export default connect(mapStateToProps)(AboutConversation)
export { AboutConversation as PureAboutConversation }
