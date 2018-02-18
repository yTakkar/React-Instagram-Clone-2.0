import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class ToHashtag extends React.Component {
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
          h = {
            key: elem,
            className: 'hashtag'
          }

        if (elem.charAt(0) == '#') {
          if (hash.substring(0, 1) !== '#') {
            return <Link
              key={h.key}
              to={`/hashtag/${hash}`}
              className={h.className}
            >{ `${elem} ` }</Link>
          }

        } else if (elem.charAt(0) == '@') {
          if (hash.substring(0, 1) !== '@') {
            return <Link
              key={h.key}
              to={`/profile/${hash}`}
              className={h.className}
            >{ `${elem} ` }</Link>
          }
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
