import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../../others/link/link'

const GrpAboutSection = ({ label, value, type, url }) => {
  return (
    <div>
      <span className="a_label">{label}</span>
      {type == 'link' ? (
        <AppLink url={url} className="a_info" label={value} />
      ) : (
        <span className="a_info">{value}</span>
      )}
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
