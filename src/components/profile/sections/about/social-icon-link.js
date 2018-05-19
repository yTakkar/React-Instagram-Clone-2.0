import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SocialIconLink = ({ value, label }) => (
  <Fragment>
    {
      value ?
        <a href={value} target='_blank'>
          <i className={`fab fa-${label}`}></i>
        </a>
        : null
    }
  </Fragment>
)

SocialIconLink.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default SocialIconLink
