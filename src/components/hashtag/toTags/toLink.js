import React from 'react'
import { Link } from 'react-router-dom'
import { uniq } from '../../../utils/utils'
import PropTypes from 'prop-types'

const ToLink = (url, label) => (
  <Link
    key={uniq()}
    to={url}
    className='hashtag'
  >{label}</Link>
)

ToLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default ToLink
