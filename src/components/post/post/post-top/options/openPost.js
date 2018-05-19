import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const OpenPost = ({ when, post_id }) => (
  <Fragment>
    {
      when != 'viewPost' ?
        <li><Link to={`/post/${post_id}`} >Open</Link></li>
        : null
    }
  </Fragment>
)

OpenPost.propTypes = {
  when: PropTypes.string.isRequired,
  post_id: PropTypes.number.isRequired
}

export default OpenPost
