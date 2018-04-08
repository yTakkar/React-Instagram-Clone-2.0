import React, { Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import ToolTip from 'react-tooltip'
import { toggle } from '../../../utils/utils'
import { deleteYourMssgs } from '../../../utils/message-utils'
import Message from './message'
import $ from 'jquery'
import { humanReadable, messageScroll } from '../../../utils/utils'
import { textMessage, imageMessage, stickerMessage } from '../../../utils/message-utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getConversationMessages, deleteCon, readConversation } from '../../../store/actions/message-a'
import Nothing from '../../others/nothing'
import Spinner from '../../others/spinner'
import Emojis from '../../others/emojis'
import Stickers from '../../others/stickers'
import Overlay from '../../others/overlay'
import { post } from 'axios'
import Notify from 'handy-notification'
import Prompt from '../../others/prompt'
import AboutConversation from './about-con'

@connect(store => (
  { messages: store.Message.messages }
))

export default class Conversation extends React.Component {

  state = {
    loading: true,
    message: '',
    emojis: false,
    messageFile: '',
    showStickers: false,
    deleteCon: false,
    showMore: false,
    unsendMssgs: false,
  }

  componentDidMount = () => {
    $('.send_mssg').focus()
    let { dispatch, conDetails: { unreadMssgs, con_id } } = this.props
    dispatch(getConversationMessages(con_id))
    dispatch(readConversation(con_id, unreadMssgs))
    messageScroll()
  }

  componentWillReceiveProps = async ({ dispatch, conDetails: { unreadMssgs, con_id } }) => {
    $('.send_mssg').focus()
    let { conDetails: cd } = this.props
    if (con_id != cd.con_id) {
      dispatch(getConversationMessages(con_id))
      dispatch(readConversation(con_id, unreadMssgs))
    }
    this.setState({ loading: false })
  }

  componentDidUpdate = () => messageScroll()

  changeValue = (what, { target: { value } }) =>
    this.setState({ [what]: value })

  _toggle = (e, what) => {
    e ? e.preventDefault() : null
    this.setState({
      [what]: !this.state[what]
    })
  }

  toggleOptions = () => toggle(this.opt)

  textMessage = e => {
    e.preventDefault()
    let
      { message } = this.state,
      { conDetails: { con_id, con_with }, dispatch } = this.props
    textMessage({ message, con_id, con_with, dispatch })
    this.setState({ message: '' })
  }

  imageMessage = async e => {
    e.preventDefault()
    this.setState({ messageFile: e.target.value })
    this.toggleOptions()
    let { conDetails: { con_id, con_with }, dispatch } = this.props
    imageMessage({
      con_id,
      con_with,
      file: e.target.files[0],
      dispatch
    })
  }

  stickerMessage = async (sticker) => {
    let { conDetails: { con_id, con_with }, dispatch } = this.props
    stickerMessage({ con_id, con_with, sticker, dispatch })
    this.toggleOptions()
  }

  unsendAllMssgs = async e => {
    e.preventDefault()
    this.toggleOptions()
    let { dispatch, conDetails: { con_id } } = this.props
    deleteYourMssgs({ con_id, dispatch })
    this._toggle(e, 'unsendMssgs')
  }

  deleteConversation = async e => {
    e.preventDefault()
    this.toggleOptions()
    let { conDetails: { con_id }, dispatch, hideConversation } = this.props

    await post('/api/delete-conversation', { con_id })
    dispatch(deleteCon(con_id))
    hideConversation()
    Notify({ value: 'Deleted conversation!!' })
  }

  render() {
    let
      { loading, message, emojis, showStickers, deleteCon, showMore, unsendMssgs } = this.state,
      {
        conDetails: { con_id, con_with, con_with_username, con_with_firstname, con_with_surname, mutualFollowersCount },
        messages
      } = this.props,
      len = messages.length,
      map_messages = messages.map(m =>
        <Message key={m.message_id} {...m} />
      )

    return (
      <div>

        { loading ? <Spinner/> : null }

        <div className={`mssg_messages ${loading ? 'cLoading' : ''}`} >
          <FadeIn duration='300ms'>

            <div className='m_m_top'>
              <div>
                <img src={`/users/${con_with}/avatar.jpg`} />
                <div className='m_m_t_c'>
                  <Link to={`/profile/${con_with_username}`} className='con_name' >{ con_with_username }</Link>
                  <span className='m_m_t_useless'>
                    {
                      mutualFollowersCount == 0 ?
                        `${con_with_firstname} ${con_with_surname}`
                        : humanReadable(mutualFollowersCount, 'mutual follower')
                    }
                  </span>
                </div>
              </div>

              <span className='m_m_exp' data-tip='Options' onClick={this.toggleOptions} >
                <i className='material-icons'>expand_more</i>
              </span>
              <div className='mssg_options options' style={{ display: 'none' }} ref={r => this.opt = r} >
                <ul>
                  <li>
                    <a href='#' className='dlt_con' onClick={e => this._toggle(e, 'deleteCon')} >Delete conversation</a>
                  </li>
                  <li>
                    <a href='#' className='dlt_mssgs' onClick={e => this._toggle(e, 'unsendMssgs')} >Unsend your mssgs</a>
                  </li>
                  <li>
                    <form className='mssg_add_img_form' >
                      <input type='file' id='mssg_add_img' onChange={this.imageMessage} />
                      <label for='mssg_add_img' className='mssg_img'>Send image</label>
                    </form>
                  </li>
                  <li><a href='#' className='mssg_sticker' onClick={e => this._toggle(e, 'showStickers')} >Send sticker</a></li>
                  <li><a href='#' className='m_m_info' onClick={e => this._toggle(e, 'showMore')} >More</a></li>
                </ul>
              </div>
            </div>

            <Scrollbars className='m_m_wrapper' style={{ height: 390 }} >
              <div className='m_m_main'>

                {
                  len == 0 ? <Nothing showMssg={false} />
                    : <FadeIn duration='300ms'>{ map_messages }</FadeIn>
                }
                <div className='mssg_end' ></div>

              </div>
            </Scrollbars>

            <div className='m_m_bottom' >
              <form className='add_mssg_form' onSubmit={this.textMessage} >
                <textarea
                  placeholder='Send message..'
                  className='send_mssg'
                  spellCheck='false'
                  required
                  autoFocus
                  value={message}
                  onChange={e => this.changeValue('message', e)}
                ></textarea>
                <span className='mssg_emoji_btn' data-tip='Add emojis' onClick={() => this._toggle(null, 'emojis')} >
                  <i className='material-icons'>sentiment_very_satisfied</i>
                </span>
                <input type='submit' name='' value='Send' className='pri_btn mssg_send' />
              </form>
            </div>

          </FadeIn>
        </div>

        <ToolTip/>

        {
          emojis ?
            <Emojis
              position={{ top: 308, left: 750 }}
              textArea={$('.send_mssg')}
              setState={value => {
                this.setState({ message: value })
              }}
            />
            : null
        }

        {
          showStickers ?
            <Fragment>
              <Overlay/>
              <Stickers
                back={() => this._toggle(null, 'showStickers')}
                type='message'
                stickerMessage={sticker => this.stickerMessage(sticker)}
              />
            </Fragment>
            : null
        }

        {
          deleteCon ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Delete conversation'
                content="This conversation will be deleted. There's no undo so you won't be able to find it."
                actionText='Delete'
                action={this.deleteConversation}
                back={() => this._toggle(null, 'deleteCon')}
              />
            </Fragment>
            : null
        }

        {
          unsendMssgs ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Unsend all your messages'
                content="All your messages will be deleted. There's no undo so you won't be able to find it."
                actionText='Delete'
                action={this.unsendAllMssgs}
                back={() => this._toggle(null, 'unsendMssgs')}
              />
            </Fragment>
            : null
        }

        {
          showMore ?
            <Fragment>
              <Overlay/>
              <AboutConversation
                back={() => this._toggle(null, 'showMore')}
                con_id={con_id}
                conWith={{
                  user: con_with,
                  username: con_with_username,
                  firstname: con_with_firstname,
                  surname: con_with_surname,
                  mutualFollowersCount,
                }}
              />
            </Fragment>
            : null
        }

      </div>
    )
  }
}
