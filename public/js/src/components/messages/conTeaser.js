import React from 'react'
import TimeAgo from 'handy-timeago'
import { Me, shortener } from '../../utils/utils'

export default class ConversationTeaser extends React.Component {
  render() {
    let {
      con_id, con_with, con_with_username, select, unreadMssgs,
      lastMssg: { lastMssgTime, lastMessage, lastMssgBy, lastMssgType }
    } = this.props

    return (
      <div className={`mssg_sr mt_${con_id}`} onClick={select} >

        <img src={`/users/${con_with}/avatar.jpg`} />
        <div className='m_sr_content'>
          <span className='m_sr_username'>{con_with_username}</span>
          <span className='m_sr_light'>
            {
              Me(lastMssgBy)
                ? <span className='mssg_sent'><i className='material-icons'>done_all</i></span>
                : null
            }

            {
              lastMessage ?

                lastMssgType == 'text' ? shortener(lastMessage, 15)
                  : lastMssgType == 'image' ?
                    <span className='camera' ><i className='fas fa-camera'></i></span>

                    : lastMssgType == 'sticker' ?
                      <span className='camera' ><i className='fas fa-gift'></i></span>

                      : null

                : null
            }
          </span>
        </div>
        <span className='m_sr_time'>
          { lastMssgTime ?  TimeAgo(lastMssgTime).replace(' ago', '') : null }
        </span>

        {
          unreadMssgs != 0
            ? <span className='m_sr_unread'>{ unreadMssgs > 9 ? '+' : unreadMssgs }</span>
            : null
        }

      </div>
    )
  }
}
