import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getConversations } from '../../store/actions/message-a'
import ConversationTeaser from './conTeaser'
import SearchFollowings from '../others/search-followings'
import Nothing from '../others/nothing'
import Loading from '../others/loading'
import { humanReadable, newConversation } from '../../utils/utils'
import Conversation from './conversation/conversation'
import $ from 'jquery'

@connect(store => {
  return {
    conversations: store.Message.conversations,
  }
})

export default class Messages extends React.Component {

  state = {
    loading: true,
    getUsersForNewCon: false,
    showConversation: false,
    conDetails: {},
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getConversations())
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  _toggle = (e, what) => {
    e ? e.preventDefault() : null
    this.setState({
      [what]: !this.state[what]
    })
  }

  createConversation = async (user, username) => {
    let { dispatch } = this.props
    newConversation({
      user, username, dispatch,
      done: () => {
        this._toggle(null, 'newCon')
        this._toggle(null, 'getUsersForNewCon')
      }
    })
  }

  selectConversation = det => {
    $('.mssg_sr').removeClass('mssg_sr_toggle')
    $(`.mt_${det.con_id}`).addClass('mssg_sr_toggle')
    this.setState({
      conDetails: det,
      showConversation: true
    })
  }

  render() {
    let
      { getUsersForNewCon, loading, showConversation, conDetails, } = this.state,
      { conversations } = this.props,
      conLen = conversations.length,
      map_conversations = conversations.map(c =>
        <ConversationTeaser
          key={c.con_id}
          {...c}
          select={() => this.selectConversation(c)}
        />
      )

    return (
      <div>

        { loading ? <Loading/> : null }

        <Title value='Messages' />

        <FadeIn duration='300ms' className={`messages_senapati ${loading ? 'cLoading' : ''}`} >

          <div className='mssg_left'>

            <div className='mssg_new'>
              <a href='#' className='pri_btn' onClick={e => this._toggle(e, 'getUsersForNewCon')} >
                <i className='fa fa-plus' aria-hidden='true' ></i>
                <span>New conversation</span>
              </a>
            </div>

            {
              getUsersForNewCon ?
                <FadeIn duration='300ms'>
                  <SearchFollowings
                    placeholder='Search to message'
                    when='new_con'
                    newConUser={(user, username) =>
                      this.createConversation(user, username)
                    }
                  />
                </FadeIn>
                : null
            }

            <span className='con_count' >{ humanReadable(conLen, 'conversation') }</span>

            {/* CONVERSATIONS */}
            {
              conLen == 0 ?
                <Nothing
                  whenMessage={true}
                  mssg='No conversations'
                />
                : <FadeIn duration='300ms'>{map_conversations}</FadeIn>
            }

          </div>

          <div className='mssg_right'>

            {/* SHOW CONVERSATION */}
            {
              showConversation ?
                <Conversation
                  conDetails={conDetails}
                  hideConversation={() => this._toggle(null, 'showConversation')}
                />
                : <div style={{ marginTop: 77 }} >
                  <Nothing mssg='Please select a conversation' />
                </div>
            }

          </div>

        </FadeIn>

      </div>
    )
  }
}
