import React, { Fragment } from 'react'
import DeleteConversation from './deleteCon'
import UnsendMessages from './unsendMssgs'
import ImageMessage from './imageMessage'
import StickerMessage from './stickerMessage'
import ConversationShowMore from './showMore'
import PropTypes from 'prop-types'

const ConversationOptions = ({ hideConversation, toggleOptions }) => {
  return (
    <Fragment>
      <ul>
        <DeleteConversation
          toggleOptions={toggleOptions}
          hideConversation={hideConversation}
        />
        <UnsendMessages toggleOptions={toggleOptions} />
        <ImageMessage toggleOptions={toggleOptions} />
        <StickerMessage toggleOptions={toggleOptions} />
        <ConversationShowMore toggleOptions={toggleOptions} />
      </ul>
    </Fragment>
  )
}

ConversationOptions.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
  hideConversation: PropTypes.func.isRequired,
}

export default ConversationOptions
