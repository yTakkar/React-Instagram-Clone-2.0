import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextInput from '../others/input/text'
import { c_first } from '../../utils/utils'
import { fieldsToArray } from '../../utils/edit-profile-utils'

export default class SocialInputs extends Component {
  map = ({ key, value }) => (
    <TextInput
      placeholder={c_first(key)}
      value={value}
      valueChange={e => this.props.change(key, e)}
      maxLength={key == 'phone' ? '10' : '255'}
    />
  )

  render() {
    // For disabled key warning
    // Key helps React update virtual DOM, but when we provide key to component of map function, text input inside that component looses focus.
    console.error = () => {}

    let { inputs } = this.props
    let array = fieldsToArray(inputs)
    let mappedInputs = array.map(this.map)

    return (
      <div className="edit_sm_div">
        <span className="edit_span">Connections</span>
        {mappedInputs}
      </div>
    )
  }
}

SocialInputs.propTypes = {
  inputs: PropTypes.shape({
    instagram: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    facebook: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  change: PropTypes.func.isRequired,
}
