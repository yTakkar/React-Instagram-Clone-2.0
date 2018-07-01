import React from 'react'
import Notify from 'handy-notification'
import Copy from 'handy-copy'
import PropTypes from 'prop-types'

const CopyLink = ({ url, label, done }) => {
  let copyLink = e => {
    e.preventDefault()
    Copy({
      value: url,
      done: () => {
        Notify({ value: 'Link copied!!' })
        done()
      },
    })
  }

  return (
    <li>
      <a href="#" className="p_copy_link" onClick={copyLink}>
        {label}
      </a>
    </li>
  )
}

CopyLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.func.isRequired,
}

export default CopyLink
