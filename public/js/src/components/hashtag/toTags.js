import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class ToTags extends React.Component {
  render() {
    let
      { str } = this.props,
      hashes = str.split(' '),
      hh = []

    if (!hashes) {
      hh = []
    } else {

      hh = hashes.map(elem => {
        let
          hash = elem.slice(1),
          filtered = hash.replace(/[^a-z0-9A-Z_]/, ''),
          isLink = elem.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/),
          h = {
            key: elem,
            className: 'hashtag'
          }

        if (elem.charAt(0) == '#') {
          if (hash.substring(0, 1) !== '#') {
            return <Link
              key={h.key}
              to={`/hashtag/${filtered}`}
              className={h.className}
            >{ `${elem} ` }</Link>
          }

        } else if (elem.charAt(0) == '@') {
          if (hash.substring(0, 1) !== '@') {
            return <Link
              key={h.key}
              to={`/profile/${filtered}`}
              className={h.className}
            >{ `${elem} ` }</Link>
          }

        } else if (isLink) {
          return <a
            key={h.key}
            target='_blank'
            href={elem}
            className={h.className}
          >{ `${elem} ` }</a>
        }

        return `${elem} `
      })

    }

    return (
      <span>{ hh }</span>
    )

  }
}

React.defaultProps = {
  str: ''
}

React.propTypes = {
  str: PropTypes.string
}
