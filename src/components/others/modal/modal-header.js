import React from 'react'
import PropTypes from 'prop-types'

const ModalHeader = ({ title }) => (
  <div className="modal_header">
    <span className="title">{title}</span>
  </div>
)

ModalHeader.defaultProps = {
  title: '',
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ModalHeader
