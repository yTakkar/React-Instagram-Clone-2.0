import React from 'react'
import AppLink from '../../others/link/link'
import { string } from 'prop-types'

const ToLink = ({ url, label }) => {
  return <AppLink url={url} className="hashtag" label={label} />
}

ToLink.propTypes = {
  url: string.isRequired,
  label: string.isRequired,
}

export default ToLink
