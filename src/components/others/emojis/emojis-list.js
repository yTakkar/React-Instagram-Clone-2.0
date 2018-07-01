import React from 'react'
import emojis from './emojis-array'
import d from '../../../utils/API/DOM'
import { EmojisPropTypes } from './emojis'

const EmojisList = props => {
  let { textArea, updateStateValue, recenterEmojis } = props

  let selectEmoji = (event, emoji) => {
    let elem = new d(textArea).toDOM(),
      value = elem.value,
      start = elem.selectionStart,
      textBefore = value.substr(0, start),
      textAfter = value.substr(start, value.length),
      finalText = textBefore + emoji + textAfter

    new d('.emoji_all li').removeClass('emoji_toggle')
    event.target.classList.add('emoji_toggle')

    updateStateValue(finalText)
  }

  let map_emojis = emojis.map(emoji => (
    <li key={emoji} onClick={e => selectEmoji(e, emoji)}>
      {emoji}
    </li>
  ))

  return (
    <div className="emoji_all" style={{ left: recenterEmojis ? -10 : null }}>
      <ul>{map_emojis}</ul>
    </div>
  )
}

EmojisList.propTypes = EmojisPropTypes

export default EmojisList
