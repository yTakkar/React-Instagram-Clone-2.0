/* eslint no-unused-vars:0 */

import React from 'react'
import Helmet from 'react-helmet'

const Title = ({ value }) => (
  <Helmet>
    <title>{`${value}`} • Instagram</title>
  </Helmet>
)

export default Title
