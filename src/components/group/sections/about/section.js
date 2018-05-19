import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GrpAboutSection = ({ label, value, type, url }) => {
  return (
    <div>
      <span className='a_label'>{ label }</span>
      {
        type == 'link'
          ? <Link to={url} className='a_info' >{value}</Link>
          : <span className='a_info'>{value}</span>
      }
    </div>
  )
}

GrpAboutSection.defaultProps = {
  type: 'text',
}

GrpAboutSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string,
}

export default GrpAboutSection
