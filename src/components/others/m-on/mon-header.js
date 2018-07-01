import React, { Fragment } from 'react'
import { humanReadable } from '../../../utils/utils'
import PropTypes from 'prop-types'

const MonHeader = ({ len, forWhat }) => (
  <Fragment>
    {len != 0 ? (
      <div className="m_header">
        <span>
          {forWhat == 'puk'
            ? `${humanReadable(len, 'follower')} you might know`
            : humanReadable(len, forWhat)}
        </span>
      </div>
    ) : null}
  </Fragment>
)

MonHeader.propTypes = {
  len: PropTypes.number.isRequired,
  forWhat: PropTypes.string.isRequired,
}

export default MonHeader
