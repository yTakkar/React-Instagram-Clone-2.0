import React from 'react'
import PropTypes from 'prop-types'
import TextArea from '../others/input/textArea'

const InputBio = ({ value, change }) => (
  <div className="edit_bio_div">
    <span className="edit_span">Bio</span>
    <TextArea
      placeholder="Bio"
      maxLength="1000"
      value={value}
      valueChange={e => change('bio', e)}
      className="edit_ta"
    />
  </div>
)

InputBio.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default InputBio
