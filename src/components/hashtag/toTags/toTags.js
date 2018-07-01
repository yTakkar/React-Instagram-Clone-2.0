import React from 'react'
import PropTypes from 'prop-types'
import { uniq } from '../../../utils/utils'
import ToLink from './toLink'

const ToTags = ({ str }) => {
  let hashes = str.split(' ')
  let hh = []

  if (!hashes) {
    hh = []
  } else {
    hh = hashes.map(elem => {
      let hash = elem.slice(1)
      let filtered = hash.replace(/[^a-z0-9A-Z_]/, '')
      let isLink = elem.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
      )

      if (elem.charAt(0) == '#') {
        if (hash.charAt(0) !== '#') {
          return (
            <ToLink
              key={uniq()}
              url={`/hashtag/${filtered}`}
              label={`${elem} `}
            />
          )
        }
      } else if (elem.charAt(0) == '@') {
        if (hash.charAt(0) !== '@') {
          return (
            <ToLink
              key={uniq()}
              url={`/profile/${filtered}`}
              label={`${elem} `}
            />
          )
        }
      } else if (isLink) {
        return (
          <a
            key={uniq()}
            target="_blank"
            href={elem}
            className="hashtag"
          >{`${elem} `}</a>
        )
      }

      return `${elem} `
    })
  }

  return <span>{hh}</span>
}

ToTags.defaultProps = {
  str: '',
}

ToTags.propTypes = {
  str: PropTypes.string.isRequired,
}

export default ToTags
