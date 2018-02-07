import React from 'react'
import { Me, toggle } from '../../../utils/utils'
import TimeAgo from 'handy-timeago'
import ToolTip from 'react-tooltip'
import Overlay from '../../others/overlay'
import EditMessage from './edit-message'
import Prompt from '../../others/prompt'
import { post } from 'axios'
import Notify from 'handy-notification'
import { deleteMssg } from '../../../store/actions/message-a'
import { connect } from 'react-redux'
import ImageTheatre from '../../others/image-theatre'

@connect(store => {
  return {
    store
  }
})

export default class Message extends React.Component {

  state = {
    message: '',
    editMessage: false,
    deleteMessage: false,
    showImage: false
  }

  componentDidMount = () =>
    this.setState({ message: this.props.message })

  _toggle = what =>
    this.setState({
      [what]: !this.state[what]
    })

  toggleTools = () => toggle(this.tools)

  deleteMessage = async e => {
    e.preventDefault()
    let { message_id, message, type, dispatch } = this.props
    await post('/api/delete-message', { message_id, message, type })
    dispatch(deleteMssg(message_id))
    await this._toggle('deleteMessage')
    Notify({ value: 'Deleted!!' })
  }

  render() {
    let
      { editMessage, deleteMessage, showImage, message } = this.state,
      { mssg_by, type, message_time, message_id } = this.props

    return (
      <div>

        <div
          className={`m_m_divs ${Me(mssg_by) ? 'my_mm_div' : 'not_my_mm_div'} `}
          onClick={this.toggleTools}
        >
          <div className='m_m' title={TimeAgo(message_time)} >
            {
              type == 'text' ? message
                : type == 'image' ? <img src={`/messages/${message}`} className='m_m_img' onClick={() => this._toggle('showImage')} />
                  : type == 'sticker' ? <img src={`/messages/${message}`} className='m_m_sticker' />
                    : null
            }
          </div>

          <span className='m_m_time'>{ TimeAgo(message_time).replace(' ago', '') }</span>

          <div className='m_m_tools' style={{ display: 'none' }} ref={r => this.tools = r} >
            {
              Me(mssg_by) ?
                <div>
                  <span data-tip='Delete'  onClick={() => this._toggle('deleteMessage')}><i className='material-icons'>delete</i></span>
                  {
                    type == 'text' ?
                      <span data-tip='Edit' onClick={() => this._toggle('editMessage')} ><i className='material-icons'>mode_edit</i></span>
                      : null
                  }
                  <ToolTip/>
                </div>
                : null
            }
          </div>
        </div>

        {
          editMessage ?
            <div>
              <Overlay/>
              <EditMessage
                back={() => this._toggle('editMessage')}
                message={message}
                message_id={message_id}
                changeMessage={message =>
                  this.setState({ message })
                }
              />
            </div>
            : null
        }

        {
          deleteMessage ?
            <div>
              <Overlay/>
              <Prompt
                title='Delete message'
                content="This message will be deleted. There's no undo so you won't be able to find it."
                actionText='Delete'
                action={this.deleteMessage}
                back={() => this._toggle('deleteMessage')}
              />
            </div>
            : null
        }

        {
          showImage?
            <div>
              <Overlay
                close_on_click={true}
                close={() => this._toggle('showImage')}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={`/messages/${message}`}
                showInfo={false}
              />
            </div>
            : null
        }

      </div>
    )
  }
}
