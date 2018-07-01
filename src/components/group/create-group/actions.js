import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PrimaryButton from '../../others/button/primary-btn'
import SecondaryButton from '../../others/button/secondary-btn'

const CreateGroupActions = ({ back, create, name }) => (
  <Fragment>
    <SecondaryButton label="Back" onClick={back} />
    <PrimaryButton
      label="Create group"
      onClick={create}
      disabled={!name}
      extraClass="c_g_update"
    />
  </Fragment>
)

CreateGroupActions.propTypes = {
  back: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default CreateGroupActions
