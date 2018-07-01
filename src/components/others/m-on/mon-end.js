import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Nothing from '../nothing'
import End from '../end'

const MonEnd = ({ len, nothingMssg }) => (
  <Fragment>{len == 0 ? <Nothing mssg={nothingMssg} /> : <End />}</Fragment>
)

MonEnd.propTypes = {
  len: PropTypes.number.isRequired,
  nothingMssg: PropTypes.string.isRequired,
}

export default MonEnd
