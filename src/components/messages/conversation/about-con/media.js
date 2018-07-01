import React from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import Nothing from '../../../others/nothing'

const ConversationMedia = ({ media }) => {
  let map_media =
    media &&
    media.map(m => (
      <img
        key={m.imgSrc}
        src={`/messages/${m.imgSrc}`}
        className="sli_media_img"
        title={`By ${Me(m.mssg_by) ? 'You' : m.mssg_by_username}`}
      />
    ))

  return (
    <div className="sli_media">
      <span className="sli_label">Media</span>
      {media && media.length == 0 ? (
        <Nothing conPage showMssg={false} />
      ) : (
        map_media
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  media: state.Message.conAbout.media,
})

export default connect(mapStateToProps)(ConversationMedia)
