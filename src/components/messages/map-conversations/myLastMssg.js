import React, { Fragment } from 'react'
import { Me } from '../../../utils/utils'
import PropTypes from 'prop-types'
import MaterialIcon from '../../others/icons/material-icon'

const MyLastMssg = ({ lastMssgBy }) => (
  <Fragment>
    {Me(lastMssgBy) && (
      <span className="mssg_sent">
        <MaterialIcon icon="done_all" />
      </span>
    )}
  </Fragment>
)

MyLastMssg.propTypes = {
  lastMssgBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default MyLastMssg
