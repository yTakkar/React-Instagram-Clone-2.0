import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ToTags from '../../../hashtag/toTags/toTags'

const AboutSection = ({ label, value, isLink }) => {
  let editLink = text => <Link to='/edit-profile' >{text}</Link>

  return (
    <div>
      <span className='a_label'>{label}</span>
      {
        value
          ? !isLink
            ? <span className='a_info'>
              { label == 'Bio' ? <ToTags str={`${value}`} /> : value }
            </span>
            : <a className='a_info' href={value} target='_blank'>{value}</a>
          : editLink(`Add ${label} account`)
      }
    </div>
  )
}

AboutSection.defaultProps = {
  isLink: false
}

AboutSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isLink: PropTypes.bool
}

export default AboutSection
