import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../../../others/link/link'

const OpenPost = ({ when, post_id }) => (
  <Fragment>
    {when != 'viewPost' && (
      <li>
        <AppLink url={`/post/${post_id}`} label="Open" />
      </li>
    )}
  </Fragment>
)

OpenPost.propTypes = {
  when: PropTypes.string.isRequired,
  post_id: PropTypes.number.isRequired,
}

export default OpenPost
