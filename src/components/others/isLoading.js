import React, { Fragment } from 'react'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import Loading from './loading'

const IsLoading = ({ loading, when }) => (
  <Fragment>
    {loading ? when == 'page' ? <Loading /> : <Spinner /> : null}
  </Fragment>
)

IsLoading.defaultProps = {
  when: 'component',
}

IsLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  when: PropTypes.oneOf(['component', 'page']),
}

export default IsLoading
