import React, { Fragment } from 'react'
import { bool, string } from 'prop-types'

const MonSticky = ({ show, text }) => (
  <Fragment>
    {show ? (
      <span className="recommend_time" style={{ display: 'block' }}>
        {text}
      </span>
    ) : null}
  </Fragment>
)

MonSticky.propTypes = {
  show: bool.isRequired,
  text: string.isRequired,
}

export default MonSticky
