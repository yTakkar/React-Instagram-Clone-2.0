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
      valueChange={e =>
        this.props.change(key, e)
      }
      maxLength={key == 'phone' ? '10' : '255'}
    />
  )

  render() {
    let { inputs } = this.props
    let array = fieldsToArray(inputs)
    let mappedInputs = array.map(this.map)

    return (
      <div className='edit_sm_div'>
        <span className='edit_span'>Connections</span>
        { mappedInputs }
      </div>
    )
  }
}

SocialInputs.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.string).isRequired,
  change: PropTypes.func.isRequired,
}
