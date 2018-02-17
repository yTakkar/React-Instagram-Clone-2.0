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
        if (elem.charAt(0) == '#') {
          let hash = elem.slice(1)
          if (hash.substring(0, 1) !== '#') {
            return <Link
              key={elem}
              to={`/hashtag/${hash}`}
              className='hashtag'
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
