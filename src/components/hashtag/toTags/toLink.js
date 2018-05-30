import React from 'react'
import { uniq } from '../../../utils/utils'
import PropTypes from 'prop-types'
import AppLink from '../../others/link/link'

const ToLink = (url, label) => (
  <AppLink
    key={uniq()}
    url={url}
    className='hashtag'
    label={label}
  />
)

ToLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default ToLink
