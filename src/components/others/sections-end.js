import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import End from './end'

const SectionsEnd = ({ len, loading }) => {
  return (
    <Fragment>
      {loading == 'undefined' ? (
        len != 0 ? (
          <End />
        ) : null
      ) : len != 0 && !loading ? (
        <End />
      ) : null}
    </Fragment>
  )
}

SectionsEnd.propTypes = {
  len: PropTypes.number.isRequired,
  loading: PropTypes.bool,
}

export default SectionsEnd
