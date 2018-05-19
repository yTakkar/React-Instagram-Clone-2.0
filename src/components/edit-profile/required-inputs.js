import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TextInput from '../others/input/text'
import { c_first } from '../../utils/utils'
import { fieldsToArray } from '../../utils/edit-profile-utils'

const RequiredInputs = ({ fields, change }) => {
  let array = fieldsToArray(fields)

  let map = ({ key, value }) => {
    let c = c_first(key)
    let type = key == 'email' ? 'email' : 'text'

    return (
      <div className='edit_un_div'>
        <span className='edit_span'>{c}</span>
        <TextInput
          type={type}
          placeholder={c}
          value={value}
          valueChange={e => change(key, e)}
          maxLength='32'
        />
      </div>
    )
  }

  let mappedFields = array.map(map)

  return (
    <Fragment>
      { mappedFields }
    </Fragment>
  )
}

RequiredInputs.propTypes = {
  fields: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  change: PropTypes.func.isRequired
}

export default RequiredInputs
