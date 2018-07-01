import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import PropTypes from 'prop-types'
import CheckBox from '../../../others/input/checkbox'
import TextArea from '../../../others/input/textArea'
import TextInput from '../../../others/input/text'

const EditGroupFields = ({ fields, changeValue, admin }) => {
  let disabled = !Me(admin) && !isAdmin()
  let { name, bio, isPrivate } = fields

  return (
    <Fragment>
      <div className="g_e_name">
        <span className="g_e_span">Group name</span>
        <TextInput
          placeholder="Group name.."
          autoFocus
          disabled={disabled}
          value={name}
          valueChange={e => changeValue('name', e)}
        />
      </div>

      <div className="g_e_bio">
        <span className="g_e_span">Group bio</span>
        <TextArea
          placeholder="Group bio.."
          value={bio}
          valueChange={e => changeValue('bio', e)}
          disabled={disabled}
          className="gen_bio"
        />
      </div>

      <div className="g_e_pri">
        <CheckBox
          label="Private group"
          disabled={disabled}
          checked={isPrivate}
          changeValue={e => changeValue('isPrivate', e)}
        />
        <span className="g_e_p_info">
          Private: Only members can interact with group
        </span>
      </div>
    </Fragment>
  )
}

EditGroupFields.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
  }).isRequired,
  changeValue: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  admin: state.Group.group_details.admin,
})

export default connect(mapStateToProps)(EditGroupFields)
export { EditGroupFields as PureEditGroupFields }
